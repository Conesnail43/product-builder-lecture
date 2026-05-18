const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/QUHdMbfcM/';

let model;
let webcam;
let maxPredictions = 0;
let isRunning = false;
let activeObjectUrl;
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');
const webcamContainer = document.getElementById('webcam-container');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
const previewImage = document.getElementById('previewImage');
const imageUpload = document.getElementById('imageUpload');
const resetAnimalBtn = document.getElementById('resetAnimalBtn');
const captureCanvas = document.getElementById('captureCanvas');
const labelContainer = document.getElementById('label-container');
const topAnimal = document.getElementById('topAnimal');
const topScore = document.getElementById('topScore');
const animalBadge = document.getElementById('animalBadge');
const statusText = document.getElementById('statusText');
const resultCaption = document.getElementById('resultCaption');

const ANIMAL_RESULTS = {
    '강아지': { badge: 'DOG', tone: 'dog', copy: '밝고 친근한 인상이 강하게 잡혔습니다.' },
    '고양이': { badge: 'CAT', tone: 'cat', copy: '차분하고 또렷한 분위기가 두드러집니다.' },
    '사슴': { badge: 'DEER', tone: 'deer', copy: '부드럽고 맑은 인상이 가장 높게 나왔습니다.' },
    '공룡': { badge: 'DINO', tone: 'dino', copy: '개성 있고 선명한 인상이 강하게 잡혔습니다.' }
};

function setStatus(message) {
    statusText.textContent = message;
}

function clearObjectUrl() {
    if (activeObjectUrl) {
        URL.revokeObjectURL(activeObjectUrl);
        activeObjectUrl = null;
    }
}

function resetAnimalResults() {
    topAnimal.textContent = '대기 중';
    topScore.textContent = '0%';
    animalBadge.textContent = '?';
    animalBadge.className = 'animal-badge';
    resultCaption.textContent = '사진을 촬영하거나 업로드하면 가장 가까운 동물상이 표시됩니다.';
    labelContainer.innerHTML = '<div class="empty-state">카메라로 촬영하거나 사진 파일을 업로드하면 결과가 표시됩니다.</div>';
}

function renderPredictions(predictions) {
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    const best = sorted[0];
    const bestScore = Math.round(best.probability * 100);
    const meta = ANIMAL_RESULTS[best.className];

    topAnimal.textContent = best.className;
    topScore.textContent = `${bestScore}%`;
    animalBadge.textContent = meta?.badge || best.className;
    animalBadge.className = `animal-badge ${meta?.tone || ''}`.trim();
    resultCaption.textContent = meta?.copy || '가장 높은 확률의 동물상이 표시되었습니다.';

    labelContainer.innerHTML = sorted.map((p) => {
        const score = Math.round(p.probability * 100);
        return `
            <div class="prediction-item">
                <div class="prediction-meta">
                    <span>${p.className}</span>
                    <strong>${score}%</strong>
                </div>
                <div class="meter"><span style="width:${score}%"></span></div>
            </div>
        `;
    }).join('');
}

async function loadModel() {
    if (model) return;
    if (!window.tmImage) throw new Error('Teachable Machine library is not loaded');
    setStatus('모델을 불러오는 중입니다...');
    model = await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
    maxPredictions = model.getTotalClasses();
}

async function startTest() {
    if (isRunning) return;
    startBtn.disabled = true;
    stopBtn.disabled = true;
    try {
        await loadModel();
        webcam = new tmImage.Webcam(360, 360, true);
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
    } catch {
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
    if (previewImage.hidden) cameraPlaceholder.hidden = false;
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

async function analyzeImage(imageElement) {
    await loadModel();
    setStatus('사진을 분석하는 중입니다...');
    const predictions = await model.predict(imageElement);
    renderPredictions(predictions);
    setStatus(`${maxPredictions}가지 동물상 분석이 완료되었습니다.`);
}

async function captureAndAnalyze() {
    if (!webcam) return;
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
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setStatus('이미지 파일만 업로드할 수 있습니다.');
        imageUpload.value = '';
        return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
        setStatus('8MB 이하의 이미지를 업로드해주세요.');
        imageUpload.value = '';
        return;
    }

    stopTest();
    clearObjectUrl();
    activeObjectUrl = URL.createObjectURL(file);
    previewImage.onload = async function () {
        cameraPlaceholder.hidden = true;
        previewImage.hidden = false;
        await analyzeImage(previewImage);
    };
    previewImage.src = activeObjectUrl;
    setStatus('업로드한 사진을 준비하는 중입니다...');
}

startBtn.addEventListener('click', startTest);
captureBtn.addEventListener('click', captureAndAnalyze);
stopBtn.addEventListener('click', function () {
    stopTest();
    setStatus('카메라가 정지되었습니다.');
});
imageUpload.addEventListener('change', handleImageUpload);
resetAnimalBtn.addEventListener('click', function () {
    stopTest();
    clearObjectUrl();
    previewImage.removeAttribute('src');
    previewImage.hidden = true;
    cameraPlaceholder.hidden = false;
    imageUpload.value = '';
    resetAnimalResults();
    setStatus('모델을 불러올 준비가 되었습니다.');
});

resetAnimalResults();
