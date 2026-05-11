const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/QUHdMbfcM/';

let model;
let webcam;
let maxPredictions = 0;
let animationFrameId;
let isRunning = false;

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const webcamContainer = document.getElementById('webcam-container');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
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
    localStorage.setItem('animal-face-theme', theme);
}

function setStatus(message) {
    statusText.textContent = message;
}

function resetResults() {
    topAnimal.textContent = '대기 중';
    topScore.textContent = '0%';
    resultCaption.textContent = '카메라를 켜면 가장 가까운 동물상이 표시됩니다.';
    labelContainer.innerHTML = '<div class="empty-state">테스트 시작을 누르면 동물상 분석 결과가 표시됩니다.</div>';
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
        webcamContainer.appendChild(webcam.canvas);
        webcam.canvas.className = 'webcam-canvas';

        stopBtn.disabled = false;
        setStatus(`${maxPredictions}가지 동물상을 분석 중입니다.`);
        loop();
    } catch (error) {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        setStatus('카메라 또는 모델을 불러오지 못했습니다.');
    }
}

function stopTest() {
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
    }

    if (webcam) {
        webcam.stop();
        webcam.canvas.remove();
        webcam = null;
    }

    cameraPlaceholder.hidden = false;
    setStatus('테스트가 정지되었습니다.');
}

async function loop() {
    if (!isRunning || !webcam) {
        return;
    }

    webcam.update();
    await predict();
    animationFrameId = window.requestAnimationFrame(loop);
}

async function predict() {
    const predictions = await model.predict(webcam.canvas);
    renderPredictions(predictions);
}

themeToggle.addEventListener('click', function() {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextTheme);
});

startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);

setTheme(localStorage.getItem('animal-face-theme') || 'light');
resetResults();
