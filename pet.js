const PET_MODE = document.body.dataset.petMode || 'daily';
const IS_TEST_MODE = PET_MODE === 'test';
const STORAGE_KEY = IS_TEST_MODE ? 'inner-hatch-avatar-test-v2' : 'inner-hatch-avatar-v2';
const LEGACY_STORAGE_KEY = IS_TEST_MODE ? 'inner-hatch-avatar-test-v1' : 'inner-hatch-avatar-v1';
const TODAY_KEY = new Date().toISOString().slice(0, 10);

const ELEMENTS = {
    wood: { label: '목', name: '나무', rhythm: '봄의 성장성', colors: ['#2f8f83', '#61c77b', '#d8f8ce'], body: 'sprout' },
    fire: { label: '화', name: '불', rhythm: '여름의 발산성', colors: ['#d94c61', '#ff9a55', '#fff0a8'], body: 'ember' },
    earth: { label: '토', name: '흙', rhythm: '전환기의 중심성', colors: ['#8c6d3a', '#d0aa62', '#f3e2b8'], body: 'pebble' },
    metal: { label: '금', name: '쇠', rhythm: '가을의 정리성', colors: ['#687384', '#bfcad7', '#f5fbff'], body: 'crystal' },
    water: { label: '수', name: '물', rhythm: '겨울의 축적성', colors: ['#236a91', '#5bc6bb', '#d8fff8'], body: 'drop' }
};

const CARE_ACTIONS = [
    {
        id: 'feed',
        icon: '◒',
        name: '먹이 주기',
        text: '따뜻한 간식을 건네 포만감과 유대를 올립니다.',
        delta: { empathy: 2, stability: 1 },
        needs: { hunger: 28, joy: 8, energy: -6, bond: 12 },
        mbti: { decision: 1, lifestyle: -1 },
        aura: 'glow',
        reward: '달콤한 씨앗'
    },
    {
        id: 'play',
        icon: '✦',
        name: '놀아주기',
        text: '작은 놀이로 기분과 표현력이 크게 자랍니다.',
        delta: { expression: 2, empathy: 1 },
        needs: { hunger: -8, joy: 28, energy: -14, bond: 10 },
        mbti: { energy: 1, decision: 1, lifestyle: 1 },
        aura: 'spark',
        reward: '반짝 구슬'
    },
    {
        id: 'train',
        icon: '◇',
        name: '훈련하기',
        text: '짧은 과제로 책임감과 안정감을 쌓습니다.',
        delta: { responsibility: 2, stability: 2 },
        needs: { hunger: -10, joy: -4, energy: -18, bond: 5 },
        mbti: { decision: -1, lifestyle: -1, perception: -1 },
        aura: 'ring',
        reward: '단단한 배지'
    },
    {
        id: 'rest',
        icon: '◌',
        name: '재우기',
        text: '조용한 휴식으로 기운을 회복하고 내면이 깊어집니다.',
        delta: { recovery: 3, boundary: 1 },
        needs: { hunger: -5, joy: 3, energy: 34, bond: 4 },
        mbti: { energy: -1, lifestyle: -1 },
        aura: 'mist',
        reward: '포근한 담요'
    },
    {
        id: 'explore',
        icon: '△',
        name: '탐험 보내기',
        text: '낯선 길을 돌아보며 탐험성과 가능성 감각이 자랍니다.',
        delta: { exploration: 3, expression: 1 },
        needs: { hunger: -16, joy: 18, energy: -20, bond: 3 },
        mbti: { perception: 1, lifestyle: 1, energy: 1 },
        aura: 'flame',
        reward: '지도 조각'
    },
    {
        id: 'clean',
        icon: '□',
        name: '집 정돈',
        text: '둥지를 정리해 안정감과 경계 감각을 높입니다.',
        delta: { boundary: 2, responsibility: 1, stability: 1 },
        needs: { hunger: -4, joy: 6, energy: -8, bond: 8 },
        mbti: { decision: -1, lifestyle: -1 },
        aura: 'nest',
        reward: '깨끗한 둥지'
    }
];

const STAT_LABELS = {
    empathy: '공감',
    boundary: '경계',
    exploration: '탐험',
    expression: '표현',
    responsibility: '책임',
    recovery: '회복',
    stability: '안정'
};

const NEED_LABELS = {
    hunger: '포만',
    joy: '기분',
    energy: '기운',
    bond: '유대'
};

const STAT_RATIONALE = {
    empathy: '돌봄과 관계 반응',
    boundary: '나와 공간을 지키는 감각',
    exploration: '새 장소와 가능성으로 향하는 힘',
    expression: '감정과 신호를 드러내는 힘',
    responsibility: '반복 행동을 유지하는 힘',
    recovery: '기운을 회복하는 힘',
    stability: '둥지를 안정시키는 힘'
};

const MBTI_AXIS_LABELS = {
    energy: { positive: 'E 외향 에너지', negative: 'I 내향 회복' },
    perception: { positive: 'N 가능성 감각', negative: 'S 현실 감각' },
    decision: { positive: 'F 관계 판단', negative: 'T 구조 판단' },
    lifestyle: { positive: 'P 유동 리듬', negative: 'J 정돈 리듬' }
};

const PARTS = [
    { id: 'ears', label: '작은 귀', stat: 'empathy', threshold: 5 },
    { id: 'tail', label: '꼬리 파츠', stat: 'exploration', threshold: 5 },
    { id: 'halo', label: '오라 링', stat: 'stability', threshold: 6 },
    { id: 'sparkle', label: '반짝 입자', stat: 'expression', threshold: 6 },
    { id: 'shell', label: '보호 껍질', stat: 'boundary', threshold: 6 },
    { id: 'badge', label: '훈련 배지', stat: 'responsibility', threshold: 6 },
    { id: 'pillow', label: '휴식 쿠션', stat: 'recovery', threshold: 6 }
];

const avatarMount = document.getElementById('avatarMount');
const petDay = document.getElementById('petDay');
const petName = document.getElementById('petName');
const petLine = document.getElementById('petLine');
const birthRhythm = document.getElementById('birthRhythm');
const petStats = document.getElementById('petStats');
const petMeters = document.getElementById('petMeters');
const onboardingCard = document.getElementById('onboardingCard');
const avatarNameInput = document.getElementById('avatarNameInput');
const birthDateInput = document.getElementById('birthDateInput');
const birthTimeInput = document.getElementById('birthTimeInput');
const createPetBtn = document.getElementById('createPetBtn');
const dailyCard = document.getElementById('dailyCard');
const questionStack = document.getElementById('questionStack');
const completeDailyBtn = document.getElementById('completeDailyBtn');
const evolutionCard = document.getElementById('evolutionCard');
const evolutionName = document.getElementById('evolutionName');
const evolutionText = document.getElementById('evolutionText');
const evidencePanel = document.getElementById('evidencePanel');
const mutationList = document.getElementById('mutationList');
const growthLog = document.getElementById('growthLog');
const resetTestBtn = document.getElementById('resetTestBtn');
const runAllTestBtn = document.getElementById('runAllTestBtn');
const runWeekTestBtn = document.getElementById('runWeekTestBtn');

let pet = loadPet();
let selectedActionId = null;

function loadPet() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved) return normalizePet(saved);
        const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
        return legacy ? migrateLegacyPet(legacy) : null;
    } catch {
        return null;
    }
}

function normalizePet(saved) {
    saved.needs = { hunger: 70, joy: 70, energy: 70, bond: 45, ...(saved.needs || {}) };
    saved.wallet = { xp: 0, coins: 0, streak: 0, ...(saved.wallet || {}) };
    saved.stats = { empathy: 1, boundary: 1, exploration: 1, expression: 1, responsibility: 1, recovery: 1, stability: 1, ...(saved.stats || {}) };
    saved.core = saved.core || {};
    saved.core.primaryElement = saved.core.primaryElement || 'water';
    saved.core.secondaryElement = saved.core.secondaryElement || 'water';
    saved.core.birthRhythm = saved.core.birthRhythm || buildBirthRhythm(saved.core.primaryElement, saved.core.secondaryElement, 'unknown');
    saved.core.mbtiScores = saved.core.mbtiScores || createMbtiScores();
    saved.core.mbti = buildMbtiProfileFromScores(saved.core.mbtiScores);
    saved.parts = saved.parts || [];
    saved.stage = saved.stage || 1;
    saved.dailyAura = saved.dailyAura || 'mist';
    saved.log = saved.log || [];
    return saved;
}

function migrateLegacyPet(legacy) {
    const migrated = normalizePet({
        name: legacy.name || '작은 알',
        createdAt: legacy.createdAt || TODAY_KEY,
        lastCheckIn: legacy.lastCheckIn || null,
        core: legacy.core || {},
        stats: legacy.stats || {},
        needs: { hunger: 72, joy: 68, energy: 70, bond: 45 },
        wallet: { xp: Math.max(0, (legacy.log || []).length * 12), coins: (legacy.log || []).length * 3, streak: 0 },
        parts: legacy.mutations || [],
        dailyAura: legacy.dailyAura || 'mist',
        stage: legacy.stage || 1,
        log: legacy.log || []
    });
    savePet(migrated);
    return migrated;
}

function savePet(target = pet) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(target));
}

function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
}

function getElementFromBirth(dateString) {
    if (!dateString) return 'water';
    const month = Number(dateString.slice(5, 7));
    if ([2, 3, 4].includes(month)) return 'wood';
    if ([5, 6, 7].includes(month)) return 'fire';
    if ([8, 9].includes(month)) return 'earth';
    if ([10, 11].includes(month)) return 'metal';
    return 'water';
}

function getSecondaryElement(time) {
    return {
        dawn: 'wood',
        morning: 'fire',
        day: 'earth',
        evening: 'metal',
        night: 'water',
        unknown: 'water'
    }[time] || 'water';
}

function createPet() {
    const birthDate = birthDateInput.value;
    const birthTime = birthTimeInput.value;
    const primaryElement = getElementFromBirth(birthDate);
    const secondaryElement = getSecondaryElement(birthTime);
    const element = ELEMENTS[primaryElement];
    const mbtiScores = createMbtiScores();

    pet = {
        name: avatarNameInput.value.trim() || `${element.label}의 알`,
        createdAt: TODAY_KEY,
        lastCheckIn: null,
        core: {
            primaryElement,
            secondaryElement,
            birthRhythm: buildBirthRhythm(primaryElement, secondaryElement, birthTime),
            mbtiScores,
            mbti: buildMbtiProfileFromScores(mbtiScores),
            body: element.body,
            colors: element.colors
        },
        stats: { empathy: 1, boundary: 1, exploration: 1, expression: 1, responsibility: 1, recovery: 1, stability: 1 },
        needs: { hunger: 76, joy: 72, energy: 78, bond: 38 },
        wallet: { xp: 0, coins: 0, streak: 0 },
        parts: [],
        dailyAura: 'mist',
        stage: 1,
        log: []
    };
    savePet();
    renderApp();
}

function createMbtiScores() {
    return { energy: 0, perception: 0, decision: 0, lifestyle: 0 };
}

function buildMbtiProfileFromScores(scores = createMbtiScores()) {
    const normalizedScores = { ...createMbtiScores(), ...scores };
    const hasSignal = Object.values(normalizedScores).some((value) => value !== 0);
    const axes = {
        energy: Math.sign(normalizedScores.energy),
        perception: Math.sign(normalizedScores.perception),
        decision: Math.sign(normalizedScores.decision),
        lifestyle: Math.sign(normalizedScores.lifestyle)
    };
    if (!hasSignal) return { type: '????', label: '성향 관찰 전', axes, scores: normalizedScores };
    const type = [
        axes.energy === 0 ? '?' : axes.energy > 0 ? 'E' : 'I',
        axes.perception === 0 ? '?' : axes.perception > 0 ? 'N' : 'S',
        axes.decision === 0 ? '?' : axes.decision > 0 ? 'F' : 'T',
        axes.lifestyle === 0 ? '?' : axes.lifestyle > 0 ? 'P' : 'J'
    ].join('');
    const labels = Object.entries(axes).map(([axis, value]) => {
        const axisLabel = MBTI_AXIS_LABELS[axis];
        if (value === 0) return `${axisLabel.positive.slice(0, 1)}/${axisLabel.negative.slice(0, 1)} 관찰 중`;
        return value > 0 ? axisLabel.positive : axisLabel.negative;
    });
    return { type, label: `${type} 경향 · ${labels.join(' · ')}`, axes, scores: normalizedScores };
}

function buildBirthRhythm(primaryElement, secondaryElement, birthTime) {
    const primary = ELEMENTS[primaryElement];
    const secondary = ELEMENTS[secondaryElement];
    const timeLabel = { dawn: '새벽', morning: '아침', day: '낮', evening: '저녁', night: '밤', unknown: '시간 미상' }[birthTime] || '시간 미상';
    return `${primary.label}${secondary.label} · ${primary.rhythm} + ${timeLabel}의 ${secondary.name} 기운`;
}

function getDayNumber() {
    if (!pet) return 1;
    const start = new Date(pet.createdAt);
    const today = new Date(TODAY_KEY);
    return Math.floor(Math.max(0, today - start) / 86400000) + 1;
}

function getAvailableActions() {
    if (IS_TEST_MODE) return CARE_ACTIONS;
    const seed = TODAY_KEY.split('-').reduce((sum, part) => sum + Number(part), 0);
    return [0, 1, 2].map((offset) => CARE_ACTIONS[(seed + offset) % CARE_ACTIONS.length]);
}

function renderActions() {
    selectedActionId = null;
    const actions = getAvailableActions();
    questionStack.innerHTML = `
        <div class="care-grid">
            ${actions.map((action) => `
                <button class="care-action" type="button" data-action="${action.id}">
                    <span class="care-icon">${action.icon}</span>
                    <strong>${action.name}</strong>
                    <small>${action.text}</small>
                    <em>${formatNeeds(action.needs)}</em>
                </button>
            `).join('')}
        </div>
    `;
    completeDailyBtn.disabled = true;
}

function formatNeeds(needs) {
    return Object.entries(needs)
        .filter(([, value]) => value !== 0)
        .map(([need, value]) => `${NEED_LABELS[need]} ${value > 0 ? '+' : ''}${value}`)
        .join(' · ');
}

function applyCareAction(action) {
    Object.entries(action.delta).forEach(([stat, value]) => {
        pet.stats[stat] = (pet.stats[stat] || 0) + value;
    });
    Object.entries(action.needs).forEach(([need, value]) => {
        pet.needs[need] = clamp((pet.needs[need] || 0) + value);
    });
    pet.core.mbtiScores = pet.core.mbtiScores || createMbtiScores();
    Object.entries(action.mbti || {}).forEach(([axis, value]) => {
        pet.core.mbtiScores[axis] = (pet.core.mbtiScores[axis] || 0) + value;
    });
    pet.core.mbti = buildMbtiProfileFromScores(pet.core.mbtiScores);
    pet.wallet.xp += 14 + Math.max(0, Math.round((pet.needs.bond - 40) / 12));
    pet.wallet.coins += 3 + (action.id === 'explore' ? 2 : 0);
    pet.wallet.streak = IS_TEST_MODE ? pet.wallet.streak + 1 : getNextStreak();
    pet.dailyAura = action.aura;
}

function getNextStreak() {
    if (!pet.lastCheckIn) return 1;
    const last = new Date(pet.lastCheckIn);
    const today = new Date(TODAY_KEY);
    const diff = Math.round((today - last) / 86400000);
    return diff === 1 ? (pet.wallet.streak || 0) + 1 : 1;
}

function updateStage() {
    const xpStage = Math.min(5, 1 + Math.floor(pet.wallet.xp / 42));
    const logStage = Math.min(5, 1 + Math.floor((pet.log.length + 1) / (IS_TEST_MODE ? 3 : 5)));
    pet.stage = Math.max(pet.stage || 1, xpStage, logStage);
}

function unlockParts() {
    const gained = [];
    PARTS.forEach((part) => {
        if ((pet.stats[part.stat] || 0) >= part.threshold && !pet.parts.includes(part.id)) {
            pet.parts.push(part.id);
            gained.push(part.label);
        }
    });
    if (pet.stage >= 3 && !pet.parts.includes('feet')) {
        pet.parts.push('feet');
        gained.push('작은 발');
    }
    if (pet.stage >= 4 && !pet.parts.includes('crown')) {
        pet.parts.push('crown');
        gained.push('성장 왕관');
    }
    return gained;
}

function getDominantStat() {
    return Object.entries(pet.stats).sort((a, b) => b[1] - a[1])[0][0];
}

function completeDaily() {
    if (!pet || (!IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY)) return;
    const action = CARE_ACTIONS.find((item) => item.id === selectedActionId);
    if (!action) return;

    applyCareAction(action);
    updateStage();
    const gained = unlockParts();
    const dominantStat = getDominantStat();
    const mood = getMood();
    const entry = {
        date: IS_TEST_MODE ? `Test ${pet.log.length + 1}` : TODAY_KEY,
        name: buildCareResultName(action, dominantStat),
        text: `${action.name}로 ${pet.name}의 ${NEED_LABELS[mood.need]} 상태가 ${mood.label} 쪽으로 움직였습니다. ${action.reward}을 얻었습니다.`,
        action: action.name,
        delta: action.delta,
        needs: action.needs,
        mbtiSummary: action.mbti,
        dominantStat,
        gained,
        reward: action.reward,
        aura: action.aura,
        stage: pet.stage
    };

    pet.log.unshift(entry);
    pet.log = pet.log.slice(0, 21);
    pet.lastCheckIn = IS_TEST_MODE ? null : TODAY_KEY;
    savePet();
    renderApp();
    showEvolution(entry);
}

function buildCareResultName(action, stat) {
    const stageName = ['알', '꼬마', '방랑', '수호', '성체'][Math.max(0, pet.stage - 1)] || '성체';
    return `${STAT_LABELS[stat]} ${stageName} · ${action.reward}`;
}

function getMood() {
    const entries = Object.entries(pet.needs).sort((a, b) => a[1] - b[1]);
    const [need, value] = entries[0];
    if (value < 35) return { need, label: '부족함' };
    if (value > 78) return { need, label: '충만함' };
    return { need: 'bond', label: '안정됨' };
}

function showEvolution(entry) {
    evolutionCard.hidden = false;
    evolutionName.textContent = entry.name;
    evolutionText.textContent = entry.text;
    renderEvidence(entry);
    mutationList.innerHTML = entry.gained.length
        ? entry.gained.map((item) => `<span>${item} 해금</span>`).join('')
        : `<span>${entry.reward} 획득</span><span>코인 +${entry.action === '탐험 보내기' ? 5 : 3}</span>`;
}

function renderEvidence(entry) {
    const statTags = Object.entries(entry.delta || {}).map(([stat, value]) => `<span>${STAT_LABELS[stat]} +${value}</span>`).join('');
    const needTags = Object.entries(entry.needs || {}).map(([need, value]) => `<span>${NEED_LABELS[need]} ${value > 0 ? '+' : ''}${value}</span>`).join('');
    const mbtiTags = Object.entries(entry.mbtiSummary || {})
        .map(([axis, value]) => `<span>${formatMbtiSignal(axis, value)}</span>`)
        .join('');

    evidencePanel.innerHTML = `
        <div class="evidence-summary">
            <p>게임 보상</p>
            <div><span>${entry.reward}</span><span>XP +14</span><span>연속 ${pet.wallet.streak}일</span></div>
        </div>
        <div class="evidence-summary">
            <p>상태 변화</p>
            <div>${needTags}</div>
        </div>
        <div class="evidence-summary">
            <p>성장 축</p>
            <div>${statTags}</div>
        </div>
        ${mbtiTags ? `<div class="evidence-summary"><p>성향 관찰</p><div>${mbtiTags}</div></div>` : ''}
        <p class="evidence-note">기본 체질: ${pet.core.birthRhythm}</p>
        <p class="evidence-note">현재 성향: ${pet.core.mbti.label}</p>
        <p class="evidence-note">${STAT_LABELS[entry.dominantStat]}은 ${STAT_RATIONALE[entry.dominantStat]}을 의미합니다.</p>
    `;
}

function formatMbtiSignal(axis, value) {
    const labels = MBTI_AXIS_LABELS[axis];
    if (!labels) return `${axis} ${value > 0 ? '+' : ''}${value}`;
    return `${value > 0 ? labels.positive : labels.negative} ${value > 0 ? '+' : ''}${value}`;
}

function renderApp() {
    if (!pet) {
        onboardingCard.hidden = false;
        dailyCard.hidden = true;
        evolutionCard.hidden = true;
        renderPixelAvatar({
            core: { primaryElement: 'water', secondaryElement: 'water', colors: ELEMENTS.water.colors },
            needs: { hunger: 70, joy: 70, energy: 70, bond: 40 },
            parts: [],
            stage: 1,
            dailyAura: 'mist'
        });
        birthRhythm.textContent = '태어난 리듬을 기다리는 중';
        renderEmptyStats();
        renderEmptyMeters();
        growthLog.innerHTML = '<p class="empty-state">첫 알을 부화시키면 돌봄 기록이 여기에 쌓입니다.</p>';
        return;
    }

    onboardingCard.hidden = true;
    dailyCard.hidden = !IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY;
    petDay.textContent = `Day ${getDayNumber()} · Lv.${pet.stage}`;
    petName.textContent = pet.name;
    petLine.textContent = buildPetLine();
    birthRhythm.textContent = `${pet.core.birthRhythm} · ${pet.core.mbti.label}`;
    renderPixelAvatar(pet);
    renderStats();
    renderMeters();
    renderGrowthLog();

    if (IS_TEST_MODE || pet.lastCheckIn !== TODAY_KEY) {
        renderActions();
    } else if (pet.log[0]) {
        showEvolution(pet.log[0]);
    }
}

function buildPetLine() {
    const mood = getMood();
    if (!IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY) return `오늘은 이미 돌봤습니다. ${NEED_LABELS[mood.need]} 상태가 ${mood.label}입니다.`;
    return `${NEED_LABELS[mood.need]} 상태가 ${mood.label}입니다. 오늘 한 번 돌봐주세요.`;
}

function renderEmptyStats() {
    petStats.innerHTML = ['Lv', 'XP', '코인', '연속'].map((label) => `<span>${label}<strong>0</strong></span>`).join('');
}

function renderStats() {
    petStats.innerHTML = `
        <span>Lv<strong>${pet.stage}</strong></span>
        <span>XP<strong>${pet.wallet.xp}</strong></span>
        <span>코인<strong>${pet.wallet.coins}</strong></span>
        <span>연속<strong>${pet.wallet.streak}</strong></span>
    `;
}

function renderEmptyMeters() {
    if (!petMeters) return;
    petMeters.innerHTML = Object.values(NEED_LABELS).map((label) => `
        <div class="pet-meter"><span>${label}</span><i><b style="width:0%"></b></i><strong>0</strong></div>
    `).join('');
}

function renderMeters() {
    if (!petMeters) return;
    petMeters.innerHTML = Object.entries(pet.needs).map(([need, value]) => `
        <div class="pet-meter">
            <span>${NEED_LABELS[need]}</span>
            <i><b style="width:${clamp(value)}%"></b></i>
            <strong>${clamp(value)}</strong>
        </div>
    `).join('');
}

function renderGrowthLog() {
    if (!pet.log.length) {
        growthLog.innerHTML = '<p class="empty-state">첫 돌봄을 완료하면 보상과 파츠 기록이 저장됩니다.</p>';
        return;
    }
    growthLog.innerHTML = pet.log.slice(0, 8).map((entry) => `
        <article class="growth-entry">
            <span>${entry.date} · Lv.${entry.stage || pet.stage}</span>
            <strong>${entry.name}</strong>
            <p>${entry.text}</p>
        </article>
    `).join('');
}

function renderPixelAvatar(state) {
    avatarMount.innerHTML = '<canvas class="pixel-avatar" width="160" height="160" aria-label="도트 아바타"></canvas>';
    const canvas = avatarMount.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const colors = state.core.colors || ELEMENTS[state.core.primaryElement || 'water'].colors;
    const element = state.core.primaryElement || 'water';
    const parts = state.parts || [];
    ctx.imageSmoothingEnabled = false;
    drawBackground(ctx, state.dailyAura || 'mist', colors);
    drawShadow(ctx);
    drawTail(ctx, element, parts, colors, state.stage || 1);
    drawBody(ctx, element, colors, state.stage || 1, parts);
    drawEars(ctx, element, parts, colors, state.stage || 1);
    drawFace(ctx, getMoodForState(state), state.stage || 1);
    drawAccessories(ctx, state, colors);
}

function drawPixel(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBackground(ctx, aura, colors) {
    ctx.fillStyle = '#f8fbff';
    ctx.fillRect(0, 0, 160, 160);
    const auraColor = { glow: '#ffe9a8', spark: '#e8dcff', ring: '#e4f0ff', mist: '#dff8ff', flame: '#ffe0c8', nest: '#efe4c2' }[aura] || colors[2];
    for (let y = 0; y < 160; y += 8) {
        for (let x = 0; x < 160; x += 8) {
            if ((x + y) % 24 === 0) drawPixel(ctx, x, y, 8, 8, auraColor);
        }
    }
    drawPixel(ctx, 16, 18, 10, 10, colors[2]);
    drawPixel(ctx, 132, 30, 8, 8, colors[1]);
    drawPixel(ctx, 26, 122, 8, 8, colors[1]);
}

function drawShadow(ctx) {
    drawPixel(ctx, 46, 130, 68, 10, 'rgba(28, 31, 36, .18)');
    drawPixel(ctx, 58, 140, 44, 5, 'rgba(28, 31, 36, .12)');
}

function drawBody(ctx, element, colors, stage, parts) {
    const w = stage >= 4 ? 58 : stage >= 2 ? 52 : 44;
    const h = stage >= 4 ? 60 : stage >= 2 ? 54 : 46;
    const x = 80 - Math.floor(w / 2);
    const y = stage >= 4 ? 58 : 66;
    drawPixel(ctx, x + 8, y, w - 16, 8, colors[1]);
    drawPixel(ctx, x, y + 8, w, h - 16, colors[1]);
    drawPixel(ctx, x + 8, y + h - 8, w - 16, 8, colors[0]);
    drawPixel(ctx, x + 8, y + 10, w - 16, 10, colors[2]);
    drawPixel(ctx, x + w - 10, y + 16, 8, h - 28, colors[0]);
    if (element === 'fire') drawPixel(ctx, x + 20, y - 12, 18, 14, '#ffb15f');
    if (element === 'wood') drawPixel(ctx, x + 22, y - 10, 14, 12, '#61c77b');
    if (element === 'metal') drawPixel(ctx, x + 14, y + 18, w - 28, 8, 'rgba(255,255,255,.58)');
    if (element === 'earth') drawPixel(ctx, x + 12, y + h - 20, w - 24, 8, '#70562d');
    if (element === 'water') drawPixel(ctx, x + 18, y - 8, 20, 10, '#5bc6bb');
    if (parts.includes('shell')) {
        drawPixel(ctx, x - 4, y + 20, 6, h - 18, '#ffffff');
        drawPixel(ctx, x + w - 2, y + 20, 6, h - 18, '#ffffff');
    }
}

function drawTail(ctx, element, parts, colors, stage) {
    if (stage < 2 && !parts.includes('tail')) return;
    const color = colors[0];
    if (element === 'metal') {
        drawPixel(ctx, 112, 92, 18, 8, color);
        drawPixel(ctx, 130, 86, 8, 20, color);
        return;
    }
    drawPixel(ctx, 34, 92, 20, 10, color);
    drawPixel(ctx, 26, 84, 12, 12, color);
    if (element === 'fire') drawPixel(ctx, 20, 76, 10, 10, '#ff9a55');
}

function drawEars(ctx, element, parts, colors, stage) {
    if (stage < 2 && !parts.includes('ears')) return;
    const color = colors[1];
    if (element === 'earth') {
        drawPixel(ctx, 48, 54, 14, 14, color);
        drawPixel(ctx, 98, 54, 14, 14, color);
        return;
    }
    drawPixel(ctx, 52, 44, 12, 22, color);
    drawPixel(ctx, 96, 44, 12, 22, color);
    drawPixel(ctx, 56, 38, 8, 8, colors[2]);
    drawPixel(ctx, 96, 38, 8, 8, colors[2]);
}

function drawFace(ctx, mood, stage) {
    const eyeY = stage >= 4 ? 86 : 92;
    drawPixel(ctx, 66, eyeY, 8, 10, '#20242a');
    drawPixel(ctx, 88, eyeY, 8, 10, '#20242a');
    if (mood === 'low') {
        drawPixel(ctx, 72, eyeY + 24, 18, 4, '#20242a');
    } else {
        drawPixel(ctx, 72, eyeY + 22, 6, 4, '#20242a');
        drawPixel(ctx, 78, eyeY + 26, 12, 4, '#20242a');
        drawPixel(ctx, 90, eyeY + 22, 6, 4, '#20242a');
    }
    if (mood === 'happy') {
        drawPixel(ctx, 56, eyeY + 14, 8, 6, '#ff9fb0');
        drawPixel(ctx, 98, eyeY + 14, 8, 6, '#ff9fb0');
    }
}

function drawAccessories(ctx, state, colors) {
    const parts = state.parts || [];
    if (parts.includes('halo')) {
        drawPixel(ctx, 58, 48, 44, 5, '#fff0a8');
        drawPixel(ctx, 52, 53, 8, 5, '#fff0a8');
        drawPixel(ctx, 100, 53, 8, 5, '#fff0a8');
    }
    if (parts.includes('sparkle')) {
        drawPixel(ctx, 33, 55, 6, 6, '#fff0a8');
        drawPixel(ctx, 124, 72, 6, 6, '#fff0a8');
        drawPixel(ctx, 116, 118, 6, 6, colors[2]);
    }
    if (parts.includes('badge')) {
        drawPixel(ctx, 76, 116, 10, 10, '#f4c978');
        drawPixel(ctx, 78, 118, 6, 6, '#8c6d3a');
    }
    if (parts.includes('pillow')) drawPixel(ctx, 54, 124, 52, 8, '#d8fff8');
    if (parts.includes('feet')) {
        drawPixel(ctx, 58, 122, 16, 8, colors[0]);
        drawPixel(ctx, 88, 122, 16, 8, colors[0]);
    }
    if (parts.includes('crown')) {
        drawPixel(ctx, 66, 44, 28, 8, '#f4c978');
        drawPixel(ctx, 70, 36, 6, 8, '#f4c978');
        drawPixel(ctx, 82, 34, 6, 10, '#f4c978');
    }
    const axes = state.core.mbti?.axes || {};
    if (axes.perception > 0) drawPixel(ctx, 118, 48, 8, 8, '#fff0a8');
    if (axes.energy > 0) {
        drawPixel(ctx, 42, 84, 6, 6, colors[2]);
        drawPixel(ctx, 112, 84, 6, 6, colors[2]);
    }
    if (axes.energy < 0) drawPixel(ctx, 70, 74, 20, 5, 'rgba(32,36,42,.18)');
}

function getMoodForState(state) {
    const needs = state.needs || {};
    const average = Object.values(needs).reduce((sum, value) => sum + value, 0) / Math.max(1, Object.values(needs).length);
    if (average >= 76 || needs.joy >= 82) return 'happy';
    if (average < 42 || needs.energy < 28 || needs.hunger < 28) return 'low';
    return 'calm';
}

questionStack.addEventListener('click', function (event) {
    const button = event.target.closest('.care-action');
    if (!button) return;
    selectedActionId = button.dataset.action;
    questionStack.querySelectorAll('.care-action').forEach((option) => {
        option.classList.toggle('selected', option === button);
    });
    completeDailyBtn.disabled = false;
});

createPetBtn.addEventListener('click', createPet);
completeDailyBtn.addEventListener('click', completeDaily);

if (resetTestBtn) {
    resetTestBtn.addEventListener('click', function () {
        localStorage.removeItem(STORAGE_KEY);
        pet = null;
        selectedActionId = null;
        evolutionCard.hidden = true;
        renderApp();
    });
}

function createDefaultTestPet() {
    if (pet) return;
    avatarNameInput.value = '테스트 알';
    birthDateInput.value = '1993-11-18';
    birthTimeInput.value = 'night';
    createPet();
}

function applyTestAction(actionId) {
    createDefaultTestPet();
    selectedActionId = actionId;
    completeDaily();
}

if (runAllTestBtn) {
    runAllTestBtn.addEventListener('click', function () {
        CARE_ACTIONS.forEach((action) => applyTestAction(action.id));
    });
}

if (runWeekTestBtn) {
    runWeekTestBtn.addEventListener('click', function () {
        for (let day = 0; day < 7; day += 1) {
            applyTestAction(CARE_ACTIONS[day % CARE_ACTIONS.length].id);
        }
    });
}

renderApp();
