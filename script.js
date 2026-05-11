const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/QUHdMbfcM/';

let model;
let webcam;
let maxPredictions = 0;
let isRunning = false;
let activeObjectUrl;

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const navButtons = document.querySelectorAll('.nav-button');
const featureViews = document.querySelectorAll('.feature-view');

const generateBtn = document.getElementById('generateBtn');
const multiGameToggle = document.getElementById('multiGameToggle');
const ticketsEl = document.getElementById('tickets');

const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');
const webcamContainer = document.getElementById('webcam-container');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
const previewImage = document.getElementById('previewImage');
const imageUpload = document.getElementById('imageUpload');
const captureCanvas = document.getElementById('captureCanvas');
const labelContainer = document.getElementById('label-container');
const topAnimal = document.getElementById('topAnimal');
const topScore = document.getElementById('topScore');
const statusText = document.getElementById('statusText');
const resultCaption = document.getElementById('resultCaption');

const RESULT_COPY = {
    '강아지': '밝고 친근한 인상이 강하게 잡혔습니다.',
    '고양이': '차분하고 또렷한 분위기가 두드러집니다.',
    '사슴': '부드럽고 맑은 인상이 가장 높게 나왔습니다.',
    '공룡': '개성 있고 선명한 인상이 강하게 잡혔습니다.'
};

function setTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? 'Dark' : 'Light';
    themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    localStorage.setItem('sandbox-theme', theme);
}

function switchFeature(targetId) {
    navButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.target === targetId);
    });

    featureViews.forEach((view) => {
        view.classList.toggle('active', view.id === targetId);
    });

    if (targetId !== 'animalView') {
        stopTest();
    }
}

function generateLottoNumbers() {
    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const selected = numbers.slice(0, 7);
    const mainNumbers = selected.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = selected[6];

    return { mainNumbers, bonusNumber };
}

function getLottoColorClass(number) {
    if (number <= 10) return 'ball-yellow';
    if (number <= 20) return 'ball-blue';
    if (number <= 30) return 'ball-red';
    if (number <= 40) return 'ball-gray';
    return 'ball-green';
}

function createLottoBall(number) {
    return `<span class="ball ${getLottoColorClass(number)}">${number}</span>`;
}

function renderLottoTicket(game, index, isCompact) {
    const mainBalls = game.mainNumbers.map(createLottoBall).join('');
    const bonusClass = getLottoColorClass(game.bonusNumber);

    if (isCompact) {
        return `
            <div class="ticket compact">
                <span class="game-label">${index + 1}게임</span>
                <div class="number-line">
                    <div class="balls">${mainBalls}</div>
                    <span class="plus">+</span>
                    <div class="bonus-ball ${bonusClass}">${game.bonusNumber}</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="game-label">${index + 1}게임</span>
            </div>
            <div class="balls">${mainBalls}</div>
            <div class="bonus-row">
                <span class="plus">+</span>
                <div class="bonus-ball ${bonusClass}">${game.bonusNumber}</div>
            </div>
        </div>
    `;
}

function renderLottoPlaceholder() {
    ticketsEl.innerHTML = `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="game-label">대기 중</span>
            </div>
            <div class="balls">
                <span class="ball placeholder">?</span>
                <span class="ball placeholder">?</span>
                <span class="ball placeholder">?</span>
                <span class="ball placeholder">?</span>
                <span class="ball placeholder">?</span>
                <span class="ball placeholder">?</span>
            </div>
            <div class="bonus-row">
                <span class="plus">+</span>
                <div class="bonus-ball placeholder">?</div>
            </div>
        </div>
    `;
}

function renderLottoGames() {
    const gameCount = multiGameToggle.checked ? 5 : 1;
    const games = Array.from({ length: gameCount }, generateLottoNumbers);
    const isCompact = games.length > 1;

    ticketsEl.innerHTML = games
        .map((game, index) => renderLottoTicket(game, index, isCompact))
        .join('');
}

function updateGenerateButtonText() {
    generateBtn.textContent = multiGameToggle.checked ? '5게임 뽑기' : '번호 뽑기';
}

function setStatus(message) {
    statusText.textContent = message;
}

function resetAnimalResults() {
    topAnimal.textContent = '대기 중';
    topScore.textContent = '0%';
    resultCaption.textContent = '사진을 촬영하거나 업로드하면 가장 가까운 동물상이 표시됩니다.';
    labelContainer.innerHTML = '<div class="empty-state">카메라로 촬영하거나 사진 파일을 업로드하면 결과가 표시됩니다.</div>';
}

function renderPredictions(predictions) {
    const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
    const best = sortedPredictions[0];
    const bestScore = Math.round(best.probability * 100);

    topAnimal.textContent = best.className;
    topScore.textContent = `${bestScore}%`;
    resultCaption.textContent = RESULT_COPY[best.className] || '가장 높은 확률의 동물상이 표시되었습니다.';

    labelContainer.innerHTML = sortedPredictions.map((prediction) => {
        const score = Math.round(prediction.probability * 100);

        return `
            <div class="prediction-item">
                <div class="prediction-meta">
                    <span>${prediction.className}</span>
                    <strong>${score}%</strong>
                </div>
                <div class="meter">
                    <span style="width: ${score}%"></span>
                </div>
            </div>
        `;
    }).join('');
}

async function loadModel() {
    if (model) {
        return;
    }

    if (!window.tmImage) {
        throw new Error('Teachable Machine library is not loaded');
    }

    setStatus('모델을 불러오는 중입니다...');
    model = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
    maxPredictions = model.getTotalClasses();
}

async function startTest() {
    if (isRunning) {
        return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = true;

    try {
        await loadModel();

        const flip = true;
        webcam = new tmImage.Webcam(360, 360, flip);
        setStatus('카메라 권한을 요청하는 중입니다...');
        await webcam.setup();
        await webcam.play();

        isRunning = true;
        cameraPlaceholder.hidden = true;
        previewImage.hidden = true;
        webcamContainer.appendChild(webcam.canvas);
        webcam.canvas.className = 'webcam-canvas';

        startBtn.disabled = true;
        captureBtn.disabled = false;
        stopBtn.disabled = false;
        setStatus('카메라가 켜졌습니다. 촬영 분석을 누르면 현재 화면으로 결과를 계산합니다.');
    } catch (error) {
        startBtn.disabled = false;
        captureBtn.disabled = true;
        stopBtn.disabled = true;
        setStatus('카메라 또는 모델을 불러오지 못했습니다.');
    }
}

function stopTest() {
    isRunning = false;
    startBtn.disabled = false;
    captureBtn.disabled = true;
    stopBtn.disabled = true;

    if (webcam) {
        webcam.stop();
        webcam.canvas.remove();
        webcam = null;
    }

    if (previewImage.hidden) {
        cameraPlaceholder.hidden = false;
    }
}

function stopCameraAfterCapture() {
    isRunning = false;
    startBtn.disabled = false;
    captureBtn.disabled = true;
    stopBtn.disabled = true;

    if (webcam) {
        webcam.stop();
        webcam.canvas.remove();
        webcam = null;
    }
}

function clearObjectUrl() {
    if (activeObjectUrl) {
        URL.revokeObjectURL(activeObjectUrl);
        activeObjectUrl = null;
    }
}

async function analyzeImage(imageElement) {
    await loadModel();
    setStatus('사진을 분석하는 중입니다...');
    const predictions = await model.predict(imageElement);
    renderPredictions(predictions);
    setStatus(`${maxPredictions}가지 동물상 분석이 완료되었습니다.`);
}

async function captureAndAnalyze() {
    if (!webcam) {
        return;
    }

    webcam.update();
    const context = captureCanvas.getContext('2d');
    context.drawImage(webcam.canvas, 0, 0, captureCanvas.width, captureCanvas.height);

    clearObjectUrl();
    previewImage.src = captureCanvas.toDataURL('image/png');
    previewImage.hidden = false;
    cameraPlaceholder.hidden = true;
    stopCameraAfterCapture();

    await analyzeImage(captureCanvas);
}

async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    stopTest();
    clearObjectUrl();
    activeObjectUrl = URL.createObjectURL(file);

    previewImage.onload = async function() {
        cameraPlaceholder.hidden = true;
        previewImage.hidden = false;
        await analyzeImage(previewImage);
    };

    previewImage.src = activeObjectUrl;
    setStatus('업로드한 사진을 준비하는 중입니다...');
}

themeToggle.addEventListener('click', function() {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextTheme);
});

navButtons.forEach((button) => {
    button.addEventListener('click', function() {
        switchFeature(button.dataset.target);
    });
});

generateBtn.addEventListener('click', renderLottoGames);
multiGameToggle.addEventListener('change', updateGenerateButtonText);
startBtn.addEventListener('click', startTest);
captureBtn.addEventListener('click', captureAndAnalyze);
stopBtn.addEventListener('click', function() {
    stopTest();
    setStatus('카메라가 정지되었습니다.');
});
imageUpload.addEventListener('change', handleImageUpload);

setTheme(localStorage.getItem('sandbox-theme') || 'light');
updateGenerateButtonText();
renderLottoPlaceholder();
resetAnimalResults();
