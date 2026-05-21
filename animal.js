const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/QUHdMbfcM/';
const MODEL_VERSION = '2026-05-18T06:52:11.010Z';

let model;
let webcam;
let maxPredictions = 0;
let isRunning = false;
let activeObjectUrl;
let previewFrameId;
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');
const webcamContainer = document.getElementById('webcam-container');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');
const previewImage = document.getElementById('previewImage');
const uploadTrigger = document.getElementById('uploadTrigger');
const imageUpload = document.getElementById('imageUpload');
const resetAnimalBtn = document.getElementById('resetAnimalBtn');
const captureCanvas = document.getElementById('captureCanvas');
const labelContainer = document.getElementById('label-container');
const topAnimal = document.getElementById('topAnimal');
const topScore = document.getElementById('topScore');
const animalBadge = document.getElementById('animalBadge');
const statusText = document.getElementById('statusText');
const resultCaption = document.getElementById('resultCaption');
const animalStyle = document.getElementById('animalStyle');
const animalKeywords = document.getElementById('animalKeywords');
const animalBlend = document.getElementById('animalBlend');
const MIX_THRESHOLD_POINTS = 12;

const ANIMAL_RESULTS = {
    '강아지상': { badge: 'DOG', tone: 'dog', copy: '밝고 친근한 인상이 강하게 잡혔습니다.', style: '햇살 같은 친근함', keywords: ['밝은 미소', '둥근 인상', '편안한 눈매'] },
    '고양이상': { badge: 'CAT', tone: 'cat', copy: '차분하고 또렷한 분위기가 두드러집니다.', style: '시크하고 또렷한 분위기', keywords: ['선명한 눈매', '차분한 표정', '도시적인 인상'] },
    '사슴상': { badge: 'DEER', tone: 'deer', copy: '부드럽고 맑은 인상이 가장 높게 나왔습니다.', style: '맑고 청순한 분위기', keywords: ['부드러운 선', '맑은 눈빛', '온화한 표정'] },
    '공룡상': { badge: 'DINO', tone: 'dino', copy: '개성 있고 선명한 인상이 강하게 잡혔습니다.', style: '개성 있는 존재감', keywords: ['뚜렷한 윤곽', '강한 인상', '장난스러운 매력'] },
    '꼬부기상': { badge: 'TURTLE', tone: 'turtle', copy: '둥글고 편안한 분위기가 가장 높게 나왔습니다.', style: '둥글고 귀여운 안정감', keywords: ['동글한 얼굴선', '순한 인상', '편안한 미소'] },
    '사마귀상': { badge: 'MANTIS', tone: 'mantis', copy: '날렵하고 또렷한 인상이 강하게 잡혔습니다.', style: '날렵하고 선명한 분위기', keywords: ['샤프한 선', '집중된 눈빛', '또렷한 이목구비'] },
    '말상': { badge: 'HORSE', tone: 'horse', copy: '시원하고 균형 잡힌 인상이 두드러집니다.', style: '시원하고 건강한 인상', keywords: ['긴 얼굴선', '반듯한 분위기', '활동적인 이미지'] },
    '곰상': { badge: 'BEAR', tone: 'bear', copy: '묵직하고 포근한 분위기가 가장 높게 나왔습니다.', style: '포근하고 든든한 분위기', keywords: ['부드러운 존재감', '따뜻한 인상', '안정적인 표정'] },
    '늑대상': { badge: 'WOLF', tone: 'wolf', copy: '선명하고 카리스마 있는 인상이 강하게 잡혔습니다.', style: '차분한 카리스마', keywords: ['깊은 눈매', '절제된 표정', '강한 분위기'] },
    '다람쥐상': { badge: 'SQUIRREL', tone: 'squirrel', copy: '작고 생기 있는 분위기가 두드러집니다.', style: '발랄하고 사랑스러운 이미지', keywords: ['생기 있는 표정', '작은 포인트', '밝은 에너지'] },
    '뱀상': { badge: 'SNAKE', tone: 'snake', copy: '차분하면서 날카로운 인상이 가장 높게 나왔습니다.', style: '신비롭고 날카로운 분위기', keywords: ['차분한 눈빛', '얇고 선명한 선', '묘한 존재감'] }
};

function setStatus(message) {
    statusText.textContent = message;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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
    animalStyle.textContent = '분석 대기 중';
    animalKeywords.textContent = '사진을 넣으면 표시됩니다';
    animalBlend.textContent = '결과 없음';
    labelContainer.innerHTML = '<div class="empty-state">카메라로 촬영하거나 사진 파일을 업로드하면 결과가 표시됩니다.</div>';
}

function renderPredictions(predictions) {
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    const best = sorted[0];
    const second = sorted[1];
    const bestScore = Math.round(best.probability * 100);
    const secondScore = second ? Math.round(second.probability * 100) : 0;
    const meta = ANIMAL_RESULTS[best.className];
    const secondMeta = second ? ANIMAL_RESULTS[second.className] : null;
    const isMixed = second && bestScore - secondScore <= MIX_THRESHOLD_POINTS;

    topAnimal.textContent = best.className;
    topScore.textContent = `${bestScore}%`;
    animalBadge.textContent = meta?.badge || best.className;
    animalBadge.className = `animal-badge ${meta?.tone || ''}`.trim();
    resultCaption.textContent = isMixed
        ? `${best.className}에 가깝지만 ${second.className} 분위기도 함께 보입니다.`
        : meta?.copy || '가장 높은 확률의 동물상이 표시되었습니다.';
    animalStyle.textContent = meta?.style || '가장 높은 확률의 동물상';
    animalKeywords.textContent = meta?.keywords?.join(' · ') || '분석 키워드 없음';
    animalBlend.textContent = second
        ? `${isMixed ? '혼합형' : '보조'}: ${second.className} ${secondScore}%${secondMeta ? ` · ${secondMeta.style}` : ''}`
        : '보조 결과 없음';

    labelContainer.innerHTML = sorted.map((p) => {
        const score = Math.round(p.probability * 100);
        return `
            <div class="prediction-item">
                <div class="prediction-meta">
                    <span>${escapeHtml(p.className)}</span>
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
    const versionQuery = `?v=${encodeURIComponent(MODEL_VERSION)}`;
    model = await tmImage.load(`${MODEL_URL}model.json${versionQuery}`, `${MODEL_URL}metadata.json${versionQuery}`);
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
        webcamContainer.innerHTML = '';
        webcamContainer.appendChild(webcam.canvas);
        webcam.canvas.className = 'webcam-canvas';
        updateCameraPreview();
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

function updateCameraPreview() {
    if (!isRunning || !webcam) return;
    webcam.update();
    previewFrameId = window.requestAnimationFrame(updateCameraPreview);
}

function stopTest() {
    isRunning = false;
    startBtn.disabled = false;
    captureBtn.disabled = true;
    stopBtn.disabled = true;

    if (previewFrameId) {
        window.cancelAnimationFrame(previewFrameId);
        previewFrameId = null;
    }

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

    if (previewFrameId) {
        window.cancelAnimationFrame(previewFrameId);
        previewFrameId = null;
    }

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
    setStatus('업로드한 사진을 준비하는 중입니다...');
    previewImage.onload = async function () {
        try {
            cameraPlaceholder.hidden = true;
            previewImage.hidden = false;
            await analyzeImage(previewImage);
        } catch {
            setStatus('사진 분석 중 문제가 발생했습니다. 다른 사진으로 다시 시도해주세요.');
        } finally {
            previewImage.onload = null;
            previewImage.onerror = null;
        }
    };
    previewImage.onerror = function () {
        previewImage.onload = null;
        previewImage.onerror = null;
        setStatus('사진을 불러오지 못했습니다. 다른 이미지 파일을 선택해주세요.');
    };
    previewImage.src = activeObjectUrl;
}

startBtn.addEventListener('click', startTest);
captureBtn.addEventListener('click', captureAndAnalyze);
stopBtn.addEventListener('click', function () {
    stopTest();
    setStatus('카메라가 정지되었습니다.');
});
uploadTrigger.addEventListener('click', function () {
    imageUpload.value = '';
    imageUpload.click();
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
