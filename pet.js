const STORAGE_KEY = 'inner-hatch-avatar-v1';
const TODAY_KEY = new Date().toISOString().slice(0, 10);

const ELEMENTS = {
    wood: { label: '목', palette: ['#2f8f83', '#7bd98e', '#d8f8ce'], body: 'seed' },
    fire: { label: '화', palette: ['#e9697a', '#ffb15f', '#fff0a8'], body: 'flame' },
    earth: { label: '토', palette: ['#9a7b43', '#d5b46f', '#f3e2b8'], body: 'stone' },
    metal: { label: '금', palette: ['#788293', '#c8d3df', '#f5fbff'], body: 'crystal' },
    water: { label: '수', palette: ['#256b93', '#63c9b9', '#d8fff8'], body: 'drop' }
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
const mutationList = document.getElementById('mutationList');
const growthLog = document.getElementById('growthLog');

let pet = loadPet();
let answers = {};

function loadPet() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved || null;
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

function getDayNumber() {
    if (!pet) return 1;
    const start = new Date(pet.createdAt);
    const today = new Date(TODAY_KEY);
    const diff = Math.max(0, today - start);
    return Math.floor(diff / 86400000) + 1;
}

function getDailyQuestions() {
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
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </article>
    `).join('');
    completeDailyBtn.disabled = true;
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
    if (!pet || pet.lastCheckIn === TODAY_KEY) return;
    const questions = getDailyQuestions();
    const selected = questions.map((question) => {
        const optionIndex = answers[question.id];
        return {
            question,
            option: question.options[optionIndex]
        };
    });

    applyAnswerDeltas(selected);
    const topTag = selected[0].option.tag;
    pet.dailyAura = getAuraFromTag(topTag);
    pet.stage = Math.min(4, 1 + Math.floor(pet.log.length / 4));
    const gained = updateMutations();
    const dominantStat = getDominantStat();
    const dayName = buildEvolutionName(dominantStat, topTag);

    const entry = {
        date: TODAY_KEY,
        name: dayName,
        text: `${STAT_LABELS[dominantStat]}의 흐름이 가장 크게 자랐습니다. 오늘의 ${topTag} 선택은 ${pet.name}에게 새로운 흔적으로 남았습니다.`,
        gained,
        aura: pet.dailyAura
    };

    pet.log.unshift(entry);
    pet.log = pet.log.slice(0, 14);
    pet.lastCheckIn = TODAY_KEY;
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
    mutationList.innerHTML = entry.gained.length
        ? entry.gained.map((item) => `<span>${item} 획득</span>`).join('')
        : '<span>오늘의 오라가 변화했습니다</span>';
}

function renderApp() {
    if (!pet) {
        onboardingCard.hidden = false;
        dailyCard.hidden = true;
        evolutionCard.hidden = true;
        renderAvatar({
            core: { body: 'seed', palette: ELEMENTS.water.palette, eyes: 'soft' },
            mutations: [],
            dailyAura: 'mist',
            stage: 1
        });
        renderEmptyStats();
        growthLog.innerHTML = '<p class="empty-state">아바타를 만들면 성장 기록이 여기에 쌓입니다.</p>';
        return;
    }

    onboardingCard.hidden = true;
    dailyCard.hidden = pet.lastCheckIn === TODAY_KEY;
    petDay.textContent = `Day ${getDayNumber()}`;
    petName.textContent = pet.name;
    petLine.textContent = pet.lastCheckIn === TODAY_KEY
        ? '오늘의 선택이 아바타에 작은 흔적으로 남았습니다.'
        : '오늘의 세 가지 선택을 기다리고 있습니다.';
    renderAvatar(pet);
    renderStats();
    renderGrowthLog();

    if (pet.lastCheckIn !== TODAY_KEY) {
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
    const mutations = state.mutations || [];
    const aura = state.dailyAura || 'mist';
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
            ${wing ? renderWings(palette) : ''}
            ${renderBody(body, shell)}
            ${root ? renderRoots() : ''}
            ${glow ? renderGlow() : ''}
            ${renderEyes(state.core.eyes)}
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

function renderBody(body, shell) {
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
    return `${shapes[body] || shapes.seed}${shellPath}`;
}

function renderWings(palette) {
    return `
        <path class="avatar-wing" d="M78 122 C42 95 41 61 85 70 C93 88 93 106 78 122Z" fill="${palette[1]}" opacity=".58"/>
        <path class="avatar-wing" d="M182 122 C218 95 219 61 175 70 C167 88 167 106 182 122Z" fill="${palette[1]}" opacity=".58"/>
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

function renderEyes(type) {
    const deep = type === 'deep';
    return `
        <ellipse class="avatar-eye" cx="108" cy="124" rx="${deep ? 8 : 10}" ry="${deep ? 12 : 9}" fill="#20242a"/>
        <ellipse class="avatar-eye" cx="152" cy="124" rx="${deep ? 8 : 10}" ry="${deep ? 12 : 9}" fill="#20242a"/>
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

renderApp();
