const PET_MODE = document.body.dataset.petMode || 'daily';
const IS_TEST_MODE = PET_MODE === 'test';
const STORAGE_KEY = IS_TEST_MODE ? 'inner-hatch-avatar-test-v1' : 'inner-hatch-avatar-v1';
const TODAY_KEY = new Date().toISOString().slice(0, 10);

const ELEMENTS = {
    wood: { label: '목', name: '나무', rhythm: '봄의 성장성', palette: ['#2f8f83', '#7bd98e', '#d8f8ce'], body: 'seed' },
    fire: { label: '화', name: '불', rhythm: '여름의 발산성', palette: ['#e9697a', '#ffb15f', '#fff0a8'], body: 'flame' },
    earth: { label: '토', name: '흙', rhythm: '전환기의 중심성', palette: ['#9a7b43', '#d5b46f', '#f3e2b8'], body: 'stone' },
    metal: { label: '금', name: '쇠', rhythm: '가을의 정리성', palette: ['#788293', '#c8d3df', '#f5fbff'], body: 'crystal' },
    water: { label: '수', name: '물', rhythm: '겨울의 축적성', palette: ['#256b93', '#63c9b9', '#d8fff8'], body: 'drop' }
};

const QUESTIONS = [
    {
        id: 'changed-plan',
        text: '오늘 누군가 갑자기 일정을 바꾼다면?',
        options: [
            { text: '이유를 듣고 가능한 선에서 조정한다', delta: { empathy: 2, stability: 1 }, tag: '배려' },
            { text: '괜찮다고 하지만 내 시간을 다시 정리한다', delta: { boundary: 2, recovery: 1 }, tag: '경계' },
            { text: '다음부터는 약속을 더 명확히 잡는다', delta: { responsibility: 2, boundary: 1 }, tag: '정리' }
        ]
    },
    {
        id: 'new-thing',
        text: '작은 새 기회가 생겼을 때 더 가까운 반응은?',
        options: [
            { text: '일단 해보고 나중에 조정한다', delta: { exploration: 2, expression: 1 }, tag: '탐험' },
            { text: '조건을 확인한 뒤 움직인다', delta: { responsibility: 2, stability: 1 }, tag: '정돈' },
            { text: '지금 에너지가 충분한지 먼저 본다', delta: { recovery: 2, boundary: 1 }, tag: '회복' }
        ]
    },
    {
        id: 'emotion',
        text: '오늘 마음을 누군가에게 보여줘야 한다면?',
        options: [
            { text: '있는 그대로 짧게 말한다', delta: { expression: 2, empathy: 1 }, tag: '표현' },
            { text: '조금 정리한 뒤 필요한 만큼만 말한다', delta: { boundary: 1, stability: 2 }, tag: '균형' },
            { text: '말보다 행동으로 티를 낸다', delta: { responsibility: 1, recovery: 1 }, tag: '관찰' }
        ]
    },
    {
        id: 'tired',
        text: '피로가 느껴지는 날, 가장 필요한 것은?',
        options: [
            { text: '혼자 조용히 회복할 시간', delta: { recovery: 3, boundary: 1 }, tag: '휴식' },
            { text: '가까운 사람과 짧은 대화', delta: { empathy: 2, expression: 1 }, tag: '연결' },
            { text: '작은 일을 하나 끝내는 감각', delta: { responsibility: 2, stability: 1 }, tag: '완료' }
        ]
    },
    {
        id: 'conflict',
        text: '의견이 다를 때 나는 주로',
        options: [
            { text: '상대의 맥락을 먼저 들어본다', delta: { empathy: 3 }, tag: '공감' },
            { text: '내 기준을 차분히 설명한다', delta: { boundary: 2, expression: 1 }, tag: '기준' },
            { text: '공통 목표를 찾아 정리한다', delta: { stability: 1, responsibility: 2 }, tag: '중재' }
        ]
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

const STAT_RATIONALE = {
    empathy: '타인의 감정과 맥락을 고려하는 선택',
    boundary: '나의 시간, 에너지, 기준을 지키는 선택',
    exploration: '불확실성 속에서 새 시도를 향하는 선택',
    expression: '생각이나 감정을 드러내는 선택',
    responsibility: '약속, 실행, 정리로 이어지는 선택',
    recovery: '피로를 알아차리고 회복을 우선하는 선택',
    stability: '상황을 차분히 정돈하고 균형을 만드는 선택'
};

const MUTATIONS = [
    { id: 'softGlow', label: '부드러운 빛점', stat: 'empathy', threshold: 6 },
    { id: 'thinShell', label: '얇은 보호 껍질', stat: 'boundary', threshold: 6 },
    { id: 'smallWing', label: '작은 탐험 날개', stat: 'exploration', threshold: 6 },
    { id: 'innerLamp', label: '안쪽 등불', stat: 'expression', threshold: 6 },
    { id: 'rootMark', label: '뿌리 문양', stat: 'responsibility', threshold: 6 },
    { id: 'mistVeil', label: '회복의 안개', stat: 'recovery', threshold: 6 },
    { id: 'nestRing', label: '안정의 둥지 고리', stat: 'stability', threshold: 6 }
];

const avatarMount = document.getElementById('avatarMount');
const petDay = document.getElementById('petDay');
const petName = document.getElementById('petName');
const petLine = document.getElementById('petLine');
const birthRhythm = document.getElementById('birthRhythm');
const petStats = document.getElementById('petStats');
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
let answers = {};

function loadPet() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!saved) return null;
        if (saved.core && !saved.core.birthRhythm) {
            saved.core.birthRhythm = buildBirthRhythm(saved.core.primaryElement || 'water', saved.core.secondaryElement || 'water', 'unknown');
        }
        return saved;
    } catch {
        return null;
    }
}

function savePet() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
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
    const map = {
        dawn: 'wood',
        morning: 'fire',
        day: 'earth',
        evening: 'metal',
        night: 'water',
        unknown: 'water'
    };
    return map[time] || 'water';
}

function createPet() {
    const birthDate = birthDateInput.value;
    const birthTime = birthTimeInput.value;
    const primaryElement = getElementFromBirth(birthDate);
    const secondaryElement = getSecondaryElement(birthTime);
    const element = ELEMENTS[primaryElement];

    pet = {
        name: avatarNameInput.value.trim() || `${element.label}의 씨앗`,
        createdAt: TODAY_KEY,
        lastCheckIn: null,
        core: {
            primaryElement,
            secondaryElement,
            birthRhythm: buildBirthRhythm(primaryElement, secondaryElement, birthTime),
            body: element.body,
            eyes: birthTime === 'night' ? 'deep' : 'soft',
            palette: element.palette
        },
        stats: {
            empathy: 1,
            boundary: 1,
            exploration: 1,
            expression: 1,
            responsibility: 1,
            recovery: 1,
            stability: 1
        },
        mutations: [],
        dailyAura: 'mist',
        stage: 1,
        log: []
    };
    savePet();
    renderApp();
}

function buildBirthRhythm(primaryElement, secondaryElement, birthTime) {
    const primary = ELEMENTS[primaryElement];
    const secondary = ELEMENTS[secondaryElement];
    const timeLabel = {
        dawn: '새벽',
        morning: '아침',
        day: '낮',
        evening: '저녁',
        night: '밤',
        unknown: '시간 미상'
    }[birthTime] || '시간 미상';
    return `${primary.label}${secondary.label} · ${primary.rhythm} + ${timeLabel}의 ${secondary.name} 기운`;
}

function getDayNumber() {
    if (!pet) return 1;
    const start = new Date(pet.createdAt);
    const today = new Date(TODAY_KEY);
    const diff = Math.max(0, today - start);
    return Math.floor(diff / 86400000) + 1;
}

function getDailyQuestions() {
    if (IS_TEST_MODE) return QUESTIONS;
    const seed = TODAY_KEY.split('-').reduce((sum, part) => sum + Number(part), 0);
    return [0, 1, 2].map((offset) => QUESTIONS[(seed + offset) % QUESTIONS.length]);
}

function renderQuestions() {
    answers = {};
    const questions = getDailyQuestions();
    questionStack.innerHTML = questions.map((question, questionIndex) => `
        <article class="question-card" data-question="${question.id}">
            <h3>${questionIndex + 1}. ${question.text}</h3>
            <div class="answer-grid">
                ${question.options.map((option, optionIndex) => `
                    <button class="answer-option" type="button" data-question="${question.id}" data-option="${optionIndex}">
                        <strong>${option.text}</strong>
                        <span>${formatDelta(option.delta)}</span>
                    </button>
                `).join('')}
            </div>
        </article>
    `).join('');
    completeDailyBtn.disabled = true;
}

function formatDelta(delta) {
    return Object.entries(delta)
        .map(([stat, value]) => `${STAT_LABELS[stat]} +${value}`)
        .join(' · ');
}

function applyAnswerDeltas(selected) {
    selected.forEach(({ option }) => {
        Object.entries(option.delta).forEach(([stat, value]) => {
            pet.stats[stat] = (pet.stats[stat] || 0) + value;
        });
    });
}

function getDominantStat() {
    return Object.entries(pet.stats).sort((a, b) => b[1] - a[1])[0][0];
}

function updateMutations() {
    const gained = [];
    MUTATIONS.forEach((mutation) => {
        if (pet.stats[mutation.stat] >= mutation.threshold && !pet.mutations.includes(mutation.id)) {
            pet.mutations.push(mutation.id);
            gained.push(mutation.label);
        }
    });
    return gained;
}

function summarizeDeltas(selected) {
    return selected.reduce((totals, { option }) => {
        Object.entries(option.delta).forEach(([stat, value]) => {
            totals[stat] = (totals[stat] || 0) + value;
        });
        return totals;
    }, {});
}

function getAuraFromTag(tag) {
    const map = {
        배려: 'glow',
        공감: 'glow',
        경계: 'ring',
        기준: 'ring',
        탐험: 'spark',
        표현: 'flame',
        휴식: 'mist',
        회복: 'mist',
        안정: 'nest',
        정돈: 'nest',
        완료: 'nest'
    };
    return map[tag] || 'mist';
}

function completeDaily() {
    if (!pet || (!IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY)) return;
    const questions = getDailyQuestions();
    const selected = questions.map((question) => {
        const optionIndex = answers[question.id];
        return {
            question,
            option: question.options[optionIndex]
        };
    });

    if (selected.some(({ option }) => !option)) return;

    applyAnswerDeltas(selected);
    const topTag = selected[0].option.tag;
    const deltaSummary = summarizeDeltas(selected);
    pet.dailyAura = getAuraFromTag(topTag);
    pet.stage = Math.min(4, 1 + Math.floor((pet.log.length + 1) / (IS_TEST_MODE ? 2 : 4)));
    const gained = updateMutations();
    const dominantStat = getDominantStat();
    const dayName = buildEvolutionName(dominantStat, topTag);

    const entry = {
        date: IS_TEST_MODE ? `Test ${pet.log.length + 1}` : TODAY_KEY,
        name: dayName,
        text: `${STAT_LABELS[dominantStat]}의 흐름이 가장 크게 자랐습니다. 오늘의 ${topTag} 선택은 ${pet.name}에게 새로운 흔적으로 남았습니다.`,
        evidence: selected.map(({ question, option }) => ({
            question: question.text,
            answer: option.text,
            delta: option.delta,
            tag: option.tag
        })),
        deltaSummary,
        dominantStat,
        gained,
        aura: pet.dailyAura
    };

    pet.log.unshift(entry);
    pet.log = pet.log.slice(0, 14);
    pet.lastCheckIn = IS_TEST_MODE ? null : TODAY_KEY;
    savePet();
    renderApp();
    showEvolution(entry);
}

function buildEvolutionName(stat, tag) {
    const adjectives = {
        empathy: '따뜻한',
        boundary: '투명한',
        exploration: '별을 좇는',
        expression: '빛나는',
        responsibility: '뿌리 깊은',
        recovery: '안개 낀',
        stability: '고요한'
    };
    const forms = {
        glow: '등불',
        ring: '유리껍질',
        spark: '별가루',
        flame: '작은 불씨',
        mist: '물결',
        nest: '둥지'
    };
    return `${adjectives[stat] || '작은'} ${forms[pet.dailyAura] || tag} ${getBodyLabel(pet.core.body)}`;
}

function getBodyLabel(body) {
    return {
        seed: '씨앗',
        flame: '불씨',
        stone: '돌알',
        crystal: '결정',
        drop: '물방울'
    }[body] || '생명체';
}

function showEvolution(entry) {
    evolutionCard.hidden = false;
    evolutionName.textContent = entry.name;
    evolutionText.textContent = entry.text;
    renderEvidence(entry);
    mutationList.innerHTML = entry.gained.length
        ? entry.gained.map((item) => `<span>${item} 획득</span>`).join('')
        : '<span>오늘의 오라가 변화했습니다</span>';
}

function renderEvidence(entry) {
    const deltas = entry.deltaSummary || {};
    const evidence = entry.evidence || [];
    const topStats = Object.entries(deltas)
        .sort((a, b) => b[1] - a[1])
        .map(([stat, value]) => `<span>${STAT_LABELS[stat]} +${value}</span>`)
        .join('');
    const selectedList = evidence.map((item) => `
        <li>
            <strong>${item.tag}</strong>
            <span>${item.answer}</span>
        </li>
    `).join('');
    const dominant = entry.dominantStat ? STAT_RATIONALE[entry.dominantStat] : '오늘 선택에서 가장 크게 자란 축';

    evidencePanel.innerHTML = `
        <div class="evidence-summary">
            <p>오늘의 근거</p>
            <div>${topStats}</div>
        </div>
        <ul>${selectedList}</ul>
        <p class="evidence-note">기본 체질: ${pet.core.birthRhythm || '태어난 리듬 정보 없음'}</p>
        <p class="evidence-note">${STAT_LABELS[entry.dominantStat] || '성장'}은 ${dominant}을 의미합니다.</p>
    `;
}

function renderApp() {
    if (!pet) {
        onboardingCard.hidden = false;
        dailyCard.hidden = true;
        evolutionCard.hidden = true;
        renderAvatar({
            core: { body: 'seed', palette: ELEMENTS.water.palette, eyes: 'soft', birthRhythm: '태어난 리듬을 기다리는 중' },
            mutations: [],
            dailyAura: 'mist',
            stage: 1
        });
        birthRhythm.textContent = '태어난 리듬을 기다리는 중';
        renderEmptyStats();
        growthLog.innerHTML = '<p class="empty-state">아바타를 만들면 성장 기록이 여기에 쌓입니다.</p>';
        return;
    }

    onboardingCard.hidden = true;
    dailyCard.hidden = !IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY;
    petDay.textContent = `Day ${getDayNumber()}`;
    petName.textContent = pet.name;
    petLine.textContent = !IS_TEST_MODE && pet.lastCheckIn === TODAY_KEY
        ? '오늘의 선택이 아바타에 작은 흔적으로 남았습니다.'
        : '오늘의 세 가지 선택을 기다리고 있습니다.';
    birthRhythm.textContent = pet.core.birthRhythm || buildBirthRhythm(pet.core.primaryElement, pet.core.secondaryElement, 'unknown');
    renderAvatar(pet);
    renderStats();
    renderGrowthLog();

    if (IS_TEST_MODE || pet.lastCheckIn !== TODAY_KEY) {
        renderQuestions();
    } else if (pet.log[0]) {
        showEvolution(pet.log[0]);
    }
}

function renderEmptyStats() {
    petStats.innerHTML = Object.values(STAT_LABELS).slice(0, 4).map((label) => `
        <span>${label}<strong>0</strong></span>
    `).join('');
}

function renderStats() {
    const topStats = Object.entries(pet.stats).sort((a, b) => b[1] - a[1]).slice(0, 4);
    petStats.innerHTML = topStats.map(([stat, value]) => `
        <span>${STAT_LABELS[stat]}<strong>${value}</strong></span>
    `).join('');
}

function renderGrowthLog() {
    if (!pet.log.length) {
        growthLog.innerHTML = '<p class="empty-state">첫 체크인을 완료하면 오늘의 진화 카드가 저장됩니다.</p>';
        return;
    }
    growthLog.innerHTML = pet.log.slice(0, 7).map((entry) => `
        <article class="growth-entry">
            <span>${entry.date}</span>
            <strong>${entry.name}</strong>
            <p>${entry.text}</p>
        </article>
    `).join('');
}

function renderAvatar(state) {
    const palette = state.core.palette || ELEMENTS.water.palette;
    const body = state.core.body;
    const primaryElement = state.core.primaryElement || 'water';
    const mutations = state.mutations || [];
    const aura = state.dailyAura || 'mist';
    const stage = state.stage || 1;
    const shell = mutations.includes('thinShell') || mutations.includes('nestRing');
    const wing = mutations.includes('smallWing');
    const glow = mutations.includes('softGlow') || mutations.includes('innerLamp');
    const root = mutations.includes('rootMark');
    const mist = mutations.includes('mistVeil') || aura === 'mist';

    avatarMount.innerHTML = `
        <svg class="generated-avatar" viewBox="0 0 260 260" role="img">
            <defs>
                <radialGradient id="petBodyGradient" cx="42%" cy="30%" r="72%">
                    <stop offset="0%" stop-color="${palette[2]}"/>
                    <stop offset="58%" stop-color="${palette[1]}"/>
                    <stop offset="100%" stop-color="${palette[0]}"/>
                </radialGradient>
                <filter id="softBlur"><feGaussianBlur stdDeviation="8"/></filter>
            </defs>
            ${renderAura(aura, palette, mist)}
            <ellipse cx="130" cy="224" rx="54" ry="12" fill="rgba(0,0,0,.2)"/>
            ${renderTail(primaryElement, palette, stage)}
            ${renderEars(primaryElement, palette, stage)}
            ${wing || stage >= 3 ? renderWings(palette, stage) : ''}
            ${renderBody(body, shell, stage)}
            ${renderFeet(palette, stage)}
            ${renderElementMark(primaryElement, palette, stage)}
            ${root ? renderRoots() : ''}
            ${glow ? renderGlow() : ''}
            ${renderCheeks(palette, stage)}
            ${renderEyes(state.core.eyes, stage)}
            ${renderParticles(aura, palette)}
        </svg>
    `;
}

function renderAura(aura, palette, mist) {
    const colors = {
        glow: palette[1],
        ring: palette[2],
        spark: '#f4c978',
        flame: '#ff9b6b',
        nest: '#d5b46f',
        mist: palette[1]
    };
    return `
        <circle class="avatar-aura" cx="130" cy="128" r="94" fill="${colors[aura] || palette[1]}" opacity="${mist ? '0.2' : '0.28'}" filter="url(#softBlur)"/>
        <circle cx="130" cy="128" r="108" fill="none" stroke="${colors[aura] || palette[1]}" stroke-width="2" opacity="0.22"/>
    `;
}

function renderBody(body, shell, stage) {
    const shapes = {
        seed: '<path class="avatar-body" d="M130 46 C176 68 194 112 174 158 C158 195 121 207 91 185 C62 163 55 121 73 86 C85 63 105 49 130 46Z" fill="url(#petBodyGradient)"/>',
        flame: '<path class="avatar-body" d="M136 42 C172 78 192 106 180 151 C170 188 139 205 106 191 C77 179 61 151 68 120 C74 91 103 80 104 47 C116 56 127 68 136 42Z" fill="url(#petBodyGradient)"/>',
        stone: '<path class="avatar-body" d="M78 91 C98 57 149 50 180 82 C208 111 194 169 154 192 C121 211 74 191 62 152 C55 129 62 107 78 91Z" fill="url(#petBodyGradient)"/>',
        crystal: '<path class="avatar-body" d="M130 42 L181 89 L166 170 L130 203 L94 170 L79 89 Z" fill="url(#petBodyGradient)"/>',
        drop: '<path class="avatar-body" d="M130 39 C165 82 187 112 178 153 C170 190 143 209 112 199 C78 188 61 154 73 120 C84 89 111 69 130 39Z" fill="url(#petBodyGradient)"/>'
    };
    const shellPath = shell
        ? '<path d="M85 95 C108 78 151 78 174 97" fill="none" stroke="rgba(255,255,255,.58)" stroke-width="8" stroke-linecap="round"/><path d="M77 153 C104 178 151 181 177 154" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="6" stroke-linecap="round"/>'
        : '';
    const stageBand = stage >= 2
        ? '<path d="M92 170 C113 188 148 188 169 170" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="7" stroke-linecap="round"/>'
        : '';
    return `${shapes[body] || shapes.seed}${stageBand}${shellPath}`;
}

function renderEars(element, palette, stage) {
    if (stage < 2) return '';
    const color = palette[1];
    const map = {
        wood: `
            <path class="avatar-ear" d="M91 73 C72 45 74 27 96 20 C105 45 108 61 104 78Z" fill="${color}"/>
            <path class="avatar-ear" d="M160 73 C181 45 179 27 157 20 C148 45 145 61 149 78Z" fill="${color}"/>
        `,
        fire: `
            <path class="avatar-ear" d="M94 76 C79 50 86 31 108 19 C111 45 109 62 103 79Z" fill="${color}"/>
            <path class="avatar-ear" d="M157 76 C172 50 165 31 143 19 C140 45 142 62 148 79Z" fill="${color}"/>
        `,
        earth: `
            <circle class="avatar-ear" cx="88" cy="70" r="21" fill="${color}"/>
            <circle class="avatar-ear" cx="172" cy="70" r="21" fill="${color}"/>
        `,
        metal: `
            <path class="avatar-ear" d="M84 76 L97 25 L111 76Z" fill="${color}"/>
            <path class="avatar-ear" d="M149 76 L163 25 L176 76Z" fill="${color}"/>
        `,
        water: `
            <path class="avatar-ear" d="M91 74 C70 54 77 29 103 31 C111 54 107 67 101 80Z" fill="${color}"/>
            <path class="avatar-ear" d="M160 74 C181 54 174 29 148 31 C140 54 144 67 150 80Z" fill="${color}"/>
        `
    };
    return map[element] || map.water;
}

function renderTail(element, palette, stage) {
    if (stage < 2) return '';
    const color = palette[0];
    const map = {
        wood: '<path class="avatar-tail" d="M70 154 C35 140 39 104 72 111 C58 128 63 144 82 152Z" fill="' + color + '" opacity=".72"/>',
        fire: '<path class="avatar-tail" d="M184 157 C220 139 210 104 184 111 C199 130 198 148 176 160Z" fill="' + color + '" opacity=".72"/>',
        earth: '<path class="avatar-tail" d="M72 164 C43 164 36 138 60 126 C68 140 80 148 92 154Z" fill="' + color + '" opacity=".7"/>',
        metal: '<path class="avatar-tail" d="M184 156 L226 138 L187 127Z" fill="' + color + '" opacity=".7"/>',
        water: '<path class="avatar-tail" d="M72 161 C39 152 47 119 77 124 C62 141 68 153 91 159Z" fill="' + color + '" opacity=".68"/>'
    };
    return map[element] || map.water;
}

function renderWings(palette, stage) {
    const scale = stage >= 4 ? 1 : .76;
    return `
        <path class="avatar-wing" d="M78 122 C${42 - 10 * scale} ${95 - 8 * scale} ${41 - 8 * scale} ${61 - 8 * scale} 85 70 C93 88 93 106 78 122Z" fill="${palette[1]}" opacity=".58"/>
        <path class="avatar-wing" d="M182 122 C${218 + 10 * scale} ${95 - 8 * scale} ${219 + 8 * scale} ${61 - 8 * scale} 175 70 C167 88 167 106 182 122Z" fill="${palette[1]}" opacity=".58"/>
    `;
}

function renderFeet(palette, stage) {
    if (stage < 2) return '';
    return `
        <ellipse class="avatar-foot" cx="103" cy="194" rx="18" ry="9" fill="${palette[0]}" opacity=".78"/>
        <ellipse class="avatar-foot" cx="157" cy="194" rx="18" ry="9" fill="${palette[0]}" opacity=".78"/>
    `;
}

function renderElementMark(element, palette, stage) {
    if (stage < 2) return '';
    const mark = {
        wood: '<path d="M130 91 C119 105 119 119 130 133 C142 118 141 105 130 91Z" fill="rgba(255,255,255,.46)"/>',
        fire: '<path d="M130 91 C145 111 140 131 130 140 C119 128 116 113 130 91Z" fill="rgba(255,255,255,.48)"/>',
        earth: '<circle cx="130" cy="118" r="18" fill="rgba(255,255,255,.38)"/>',
        metal: '<path d="M130 94 L151 116 L130 138 L109 116Z" fill="rgba(255,255,255,.42)"/>',
        water: '<path d="M130 92 C149 114 146 139 130 144 C114 139 111 114 130 92Z" fill="rgba(255,255,255,.42)"/>'
    };
    return `${mark[element] || mark.water}<circle cx="130" cy="118" r="5" fill="${palette[2]}" opacity=".86"/>`;
}

function renderCheeks(palette, stage) {
    if (stage < 2) return '';
    return `
        <circle cx="92" cy="141" r="8" fill="${palette[2]}" opacity=".42"/>
        <circle cx="168" cy="141" r="8" fill="${palette[2]}" opacity=".42"/>
    `;
}

function renderRoots() {
    return `
        <path d="M117 190 C110 211 98 219 82 224" fill="none" stroke="#7a5a31" stroke-width="5" stroke-linecap="round"/>
        <path d="M137 190 C143 211 157 219 176 223" fill="none" stroke="#7a5a31" stroke-width="5" stroke-linecap="round"/>
    `;
}

function renderGlow() {
    return '<circle class="inner-glow" cx="130" cy="151" r="18" fill="#fff0a8" opacity=".82"/>';
}

function renderEyes(type, stage) {
    const deep = type === 'deep';
    const shine = stage >= 3
        ? '<circle cx="105" cy="119" r="3" fill="#fff"/><circle cx="149" cy="119" r="3" fill="#fff"/>'
        : '';
    return `
        <ellipse class="avatar-eye" cx="108" cy="124" rx="${deep ? 8 : 10}" ry="${deep ? 12 : 9}" fill="#20242a"/>
        <ellipse class="avatar-eye" cx="152" cy="124" rx="${deep ? 8 : 10}" ry="${deep ? 12 : 9}" fill="#20242a"/>
        ${shine}
        <path d="M113 158 C123 166 139 166 149 158" fill="none" stroke="#20242a" stroke-width="5" stroke-linecap="round"/>
    `;
}

function renderParticles(aura, palette) {
    const color = aura === 'spark' ? '#f4c978' : palette[2];
    return [60, 95, 176, 204].map((x, index) => {
        const y = [78, 200, 62, 154][index];
        return `<circle class="avatar-particle particle-${index}" cx="${x}" cy="${y}" r="${index % 2 ? 4 : 3}" fill="${color}" opacity=".78"/>`;
    }).join('');
}

questionStack.addEventListener('click', function (event) {
    const button = event.target.closest('.answer-option');
    if (!button) return;
    const questionId = button.dataset.question;
    answers[questionId] = Number(button.dataset.option);
    questionStack.querySelectorAll(`[data-question="${questionId}"].answer-option`).forEach((option) => {
        option.classList.toggle('selected', option === button);
    });
    completeDailyBtn.disabled = Object.keys(answers).length !== getDailyQuestions().length;
});

createPetBtn.addEventListener('click', createPet);
completeDailyBtn.addEventListener('click', completeDaily);

if (resetTestBtn) {
    resetTestBtn.addEventListener('click', function () {
        localStorage.removeItem(STORAGE_KEY);
        pet = null;
        answers = {};
        evolutionCard.hidden = true;
        renderApp();
    });
}

function createDefaultTestPet() {
    if (pet) return;
    avatarNameInput.value = '테스트 아바타';
    birthDateInput.value = '1993-11-18';
    birthTimeInput.value = 'night';
    createPet();
}

function applyTestPattern(pattern) {
    createDefaultTestPet();
    const questions = getDailyQuestions();
    answers = {};
    questions.forEach((question, index) => {
        answers[question.id] = pattern(index, question);
    });
    completeDaily();
}

if (runAllTestBtn) {
    runAllTestBtn.addEventListener('click', function () {
        [0, 1, 2].forEach((optionIndex) => {
            applyTestPattern(() => optionIndex);
        });
    });
}

if (runWeekTestBtn) {
    runWeekTestBtn.addEventListener('click', function () {
        for (let day = 0; day < 7; day += 1) {
            applyTestPattern((index) => (day + index) % 3);
        }
    });
}

renderApp();
