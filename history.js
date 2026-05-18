const FACTS = [
    {
        year: '기원전 2560년 ~ 기원전 30년',
        title: '클레오파트라는 달 착륙과 더 가까운 시대에 살았다',
        content: '피라미드가 완공된 것은 기원전 약 2560년이고, 클레오파트라는 기원전 69년에 태어났습니다. 클레오파트라는 피라미드가 세워진 때보다 달 착륙(1969년)에 훨씬 더 가까운 시대에 살았습니다.',
        category: '고대사'
    },
    {
        year: '1000년경',
        title: '바이킹이 콜럼버스보다 500년 먼저 북미에 도달했다',
        content: '북유럽 탐험가 레이프 에이릭손은 콜럼버스보다 약 500년 앞서 북아메리카 대륙(현재의 캐나다 뉴펀들랜드)에 도달했습니다. 이 사실은 1960년대 고고학 발굴로 확인되었습니다.',
        category: '탐험'
    },
    {
        year: '1096년',
        title: '옥스퍼드 대학교는 아즈텍 제국보다 오래됐다',
        content: '옥스퍼드 대학교는 1096년경 교육을 시작했습니다. 아즈텍 제국은 1428년에 세워졌으니, 옥스퍼드는 아즈텍 제국보다 약 300년 더 오래된 기관입니다.',
        category: '문명'
    },
    {
        year: '기원전 218년',
        title: '한니발은 코끼리를 이끌고 알프스를 넘었다',
        content: '카르타고의 장군 한니발은 기원전 218년, 37마리의 전투 코끼리를 포함한 대군을 이끌고 알프스 산맥을 넘어 로마를 공격했습니다. 역사상 가장 대담한 군사 작전 중 하나로 꼽힙니다.',
        category: '전쟁'
    },
    {
        year: '1889년',
        title: '닌텐도는 원래 화투 카드 회사였다',
        content: '세계적인 게임 회사 닌텐도는 1889년 야마우치 후사지로가 설립한 화투(하나후다) 카드 제조사였습니다. 비디오 게임 산업에 진출한 것은 약 80년이 지난 1970년대의 일입니다.',
        category: '기업'
    },
    {
        year: '기원전 1650년경',
        title: '피라미드 완공 후에도 매머드는 900년간 지구에 존재했다',
        content: '마지막 매머드 무리는 기원전 1650년까지 시베리아 브란겔 섬에 살아있었습니다. 이집트 대피라미드는 기원전 2560년 완공되었으니, 피라미드 건설 후에도 매머드는 약 900년간 지구에 존재했습니다.',
        category: '자연사'
    },
    {
        year: '1903년',
        title: '라이트 형제의 첫 비행은 보잉 747 기내보다 짧았다',
        content: '1903년 라이트 형제의 첫 비행 거리는 약 36.5미터였습니다. 보잉 747 기내 길이는 약 57미터로, 인류 최초의 동력 비행이 지금의 여객기 안에서 이뤄질 수 있었을 정도입니다.',
        category: '과학기술'
    },
    {
        year: '기원전 776년',
        title: '고대 올림픽 선수들은 나체로 경기를 펼쳤다',
        content: '기원전 776년에 시작된 고대 그리스 올림픽에서 선수들은 아무것도 입지 않고 경기에 참가했습니다. 그리스어로 "나체"를 뜻하는 "gymnos"에서 체육관을 의미하는 "gymnasium"이 유래했습니다.',
        category: '스포츠'
    },
    {
        year: '1969년',
        title: '아폴로 11호 컴퓨터는 현재 스마트폰보다 성능이 수천만 배 낮았다',
        content: '인류를 달에 보낸 아폴로 11호 유도 컴퓨터(AGC)는 4킬로헤르츠 CPU와 4킬로바이트 RAM을 가졌습니다. 현재 보급형 스마트폰의 성능은 그보다 수천만 배 이상 강력합니다.',
        category: '우주'
    },
    {
        year: '79년',
        title: '폼페이가 화산에 묻힌 날짜는 약 1700년간 잘못 알려져 있었다',
        content: '베수비오 화산 폭발로 폼페이가 파묻힌 날은 전통적으로 79년 8월 24일로 알려졌지만, 2018년 발굴된 낙서 기록에는 10월 이후로 적혀 있어 실제 날짜가 수정되었습니다.',
        category: '고대사'
    },
    {
        year: '13세기',
        title: '몽골 제국은 인류 역사상 가장 넓은 연속 영토를 지배했다',
        content: '몽골 제국의 최대 영토는 약 2,400만 제곱킬로미터로, 현재 지구 육지 면적의 약 16%에 해당합니다. 이는 역사상 어떤 제국보다 넓은 연속된 영토였습니다.',
        category: '정복'
    },
    {
        year: '1912년',
        title: '타이타닉 마지막 생존자는 2009년에 사망했다',
        content: '1912년 타이타닉 침몰 당시 2개월이었던 밀비나 딘은 이 사고의 마지막 생존자로, 97세였던 2009년에 사망했습니다. 타이타닉 침몰부터 세계 금융위기(2008년)까지 한 사람의 생애로 이어진 것입니다.',
        category: '근대사'
    },
    {
        year: '1928년',
        title: '페니실린은 실수로 발견되었다',
        content: '1928년 알렉산더 플레밍은 휴가를 다녀온 뒤 페트리 접시에서 곰팡이가 주변 세균을 죽이는 것을 우연히 발견했습니다. 이 발견이 항생제 시대를 열어 수억 명의 생명을 구했습니다.',
        category: '과학'
    },
    {
        year: '기원전 44년',
        title: '율리우스 카이사르는 암살 경고를 무시했다',
        content: '카이사르는 기원전 44년 3월 15일 원로원으로 가기 전, 점쟁이에게 "3월 15일을 조심하라"는 경고를 받았습니다. 그러나 이를 무시했고, 그날 원로원 의원들에게 23번 찔려 암살당했습니다.',
        category: '고대사'
    },
    {
        year: '1953년',
        title: '에베레스트 첫 등정 소식은 영국 여왕 대관식 날 전해졌다',
        content: '에드먼드 힐러리와 텐징 노르가이가 1953년 5월 29일 에베레스트 정상에 올랐고, 이 소식은 엘리자베스 2세 여왕의 대관식(6월 2일) 당일 아침 영국에 전해졌습니다.',
        category: '탐험'
    },
    {
        year: '1945년',
        title: '일부 생존자는 히로시마와 나가사키 원폭을 모두 겪었다',
        content: '히로시마 원폭(8월 6일) 이후 살아남아 나가사키로 이동했다가 사흘 뒤 나가사키 원폭도 경험한 사람들을 "이중 피폭자"라고 합니다. 일본 정부는 2010년 공식적으로 165명의 이중 피폭 사실을 인정했습니다.',
        category: '세계대전'
    },
    {
        year: '1957년',
        title: '최초로 지구 궤도를 돈 생명체는 개였다',
        content: '1957년 소련의 라이카는 최초로 지구 궤도를 돈 생명체가 되었지만, 귀환 기술이 없어 우주에서 생을 마쳤습니다. 최초로 살아 돌아온 생명체는 1960년의 벨카와 스트렐카였습니다.',
        category: '우주'
    },
    {
        year: '1439년',
        title: '구텐베르크 인쇄기 이전 성경 한 권은 필사에 1~2년이 걸렸다',
        content: '구텐베르크가 1439년경 발명한 활판 인쇄기 이전, 유럽에서 성경 한 권을 손으로 필사하는 데 수사 한 명이 약 1~2년이 걸렸습니다. 인쇄기 등장 이후 정보의 대중화 혁명이 시작되었습니다.',
        category: '문화'
    },
    {
        year: '1347~1351년',
        title: '흑사병은 유럽 인구의 약 3분의 1을 앗아갔다',
        content: '14세기 유럽을 강타한 흑사병(페스트)은 불과 4년 만에 유럽 인구의 약 30~60%를 사망에 이르게 했습니다. 이 재앙은 봉건제도의 붕괴와 르네상스의 도래를 앞당기는 계기가 되었습니다.',
        category: '역병'
    },
    {
        year: '1917년',
        title: '러시아 혁명은 같은 해 두 번 일어났다',
        content: '1917년 러시아에서는 두 차례의 혁명이 일어났습니다. 2월 혁명으로 300년 로마노프 왕조가 끝났고, 10월 혁명으로 레닌이 이끄는 공산 정권이 들어섰습니다. 두 혁명은 불과 8개월 차이로 발생했습니다.',
        category: '정치혁명'
    },
    {
        year: '기원전 240년경',
        title: '고대 그리스인들은 이미 지구가 둥글다는 것을 알았다',
        content: '에라토스테네스는 기원전 240년경 막대기와 그림자만으로 지구의 둘레를 놀랍도록 정확하게 계산해냈습니다. 지구가 평평하다는 믿음은 고대 그리스에서는 이미 극복된 생각이었습니다.',
        category: '과학'
    },
    {
        year: '1666년',
        title: '런던 대화재 공식 사망자는 단 6명이었다',
        content: '1666년 런던 대화재는 도시의 약 80%를 태우고 13,000채 이상의 건물을 파괴했지만, 공식 사망자는 단 6명에 불과했습니다. 화재가 느리게 번진 덕분에 대부분의 시민이 탈출할 수 있었습니다.',
        category: '재난'
    },
    {
        year: '1세기',
        title: '로마 검투사들은 현대 스포츠 스타처럼 대우받았다',
        content: '성공한 로마 검투사는 팬레터를 받고, 광고에 출연하며, 상당한 보수를 받았습니다. 일부 자유인은 이 삶을 스스로 선택하기도 했습니다. 노예 출신이라는 편견과 달리, 검투사는 일종의 셀러브리티였습니다.',
        category: '고대사'
    },
    {
        year: '1867년',
        title: '미국은 알래스카를 러시아로부터 단돈 720만 달러에 구입했다',
        content: '1867년 미국 국무장관 윌리엄 수어드는 러시아로부터 알래스카를 약 720만 달러에 매입했습니다. 당시 언론은 이를 "수어드의 어리석음"이라 비웃었지만, 알래스카는 이후 막대한 석유와 자원의 보고로 밝혀졌습니다.',
        category: '정치'
    },
    {
        year: '1853년',
        title: '청바지는 원래 광부들의 작업복으로 만들어졌다',
        content: '리바이 스트라우스는 1853년 캘리포니아 골드러시 시대에 내구성 강한 작업복이 필요한 광부들을 위해 데님 바지를 제작했습니다. 오늘날 전 세계인이 입는 청바지의 시작이었습니다.',
        category: '문화'
    },
    {
        year: '기원전 7세기~17세기',
        title: '만리장성은 한 번에 지어진 것이 아니다',
        content: '만리장성은 기원전 7세기부터 여러 왕조에 걸쳐 수백 년에 걸쳐 건설, 확장, 수리되었습니다. 우리가 흔히 보는 모습은 대부분 명나라(1368~1644년) 때 대대적으로 재건된 것입니다.',
        category: '건축'
    },
    {
        year: '1815년',
        title: '나폴레옹은 워털루 전투 전에도 한 번 유배를 다녀왔다',
        content: '나폴레옹은 1814년 엘바 섬으로 유배를 갔다가 탈출하여 다시 권력을 잡았습니다. 그 후 워털루 전투(1815년)에서 패배해 세인트헬레나 섬으로 두 번째 유배를 떠났고, 그곳에서 생을 마감했습니다.',
        category: '유럽사'
    },
    {
        year: '기원전 3000년경',
        title: '맥주는 인류 최초의 기록된 음료 중 하나다',
        content: '맥주 양조의 증거는 기원전 3400년경 메소포타미아(현재의 이란)에서 발견되었습니다. 고대 수메르인들은 맥주를 신성한 음료로 여겼으며, 노동자에게 임금 대신 맥주를 지급하기도 했습니다.',
        category: '문화'
    },
    {
        year: '1687년',
        title: '뉴턴의 사과 이야기는 실제 경험에 기반한다',
        content: '아이작 뉴턴이 사과나무 아래서 사과가 떨어지는 것을 보고 중력 법칙을 떠올렸다는 이야기는 뉴턴 본인이 생전에 여러 사람에게 전한 것으로, 단순한 전설이 아닌 실제 경험에 기반한 일화로 받아들여집니다.',
        category: '과학'
    },
    {
        year: '1969년',
        title: '달 착륙 당시 암스트롱의 유명한 발언에는 녹음 오류가 있었다',
        content: '닐 암스트롱이 달에 발을 디디며 한 "한 인간에게는 작은 한 걸음"이라는 말에서, 암스트롱 본인은 "a man(한 인간)"을 말했다고 주장했지만 잡음으로 인해 부정관사 "a"가 녹음에서 누락되었다는 분석도 있습니다.',
        category: '우주'
    },
    {
        year: '기원전 5세기',
        title: '히포크라테스는 인류 역사상 가장 유명한 의사지만 그의 저작이 맞는지 불확실하다',
        content: '"히포크라테스 전집"에 수록된 약 60편의 저작 중 실제로 히포크라테스 본인이 쓴 것은 얼마 되지 않는다고 학자들은 보고 있습니다. 그럼에도 그의 이름을 딴 의사 윤리 서약인 "히포크라테스 선서"는 지금도 이어지고 있습니다.',
        category: '과학'
    }
];

const REMOTE_HISTORY_BASE = 'https://history.muffinlabs.com/date';
const INTERESTING_TERMS = [
    'abolished', 'agreement', 'announces', 'attack', 'battle', 'becomes', 'begins', 'breaks out',
    'captures', 'collapsed', 'conquest', 'coup', 'created', 'declares', 'defeats', 'discovered',
    'earthquake', 'elected', 'ends', 'erupts', 'established', 'explodes', 'founded', 'independence',
    'invention', 'invades', 'launched', 'liberated', 'massacre', 'mission', 'opens', 'rebel',
    'rebellion', 'revolution', 'riot', 'signed', 'sinks', 'space', 'strike', 'treaty', 'war'
];
const LOW_VALUE_TERMS = [
    'is born', 'was born', 'dies', 'died', 'birthday', 'death of', 'marries', 'married',
    'appointed', 'crowned', 'canonized'
];

let facts = [];
let shownIndices = [];
let activeCategory = '전체';
let activeDateLabel = '';
let isLoading = false;

const factYear = document.getElementById('factYear');
const factCategory = document.getElementById('factCategory');
const factTitle = document.getElementById('factTitle');
const factContent = document.getElementById('factContent');
const factOriginal = document.getElementById('factOriginal');
const factSource = document.getElementById('factSource');
const factCounter = document.getElementById('factCounter');
const newFactBtn = document.getElementById('newFactBtn');
const todayFactBtn = document.getElementById('todayFactBtn');
const historySearch = document.getElementById('historySearch');
const categoryFilter = document.getElementById('categoryFilter');
const relatedList = document.getElementById('relatedList');

function getRandomDate() {
    const year = 2024;
    const start = new Date(year, 0, 1);
    const dayOffset = Math.floor(Math.random() * 366);
    const date = new Date(start);
    date.setDate(start.getDate() + dayOffset);
    return {
        month: date.getMonth() + 1,
        day: date.getDate()
    };
}

function getTodayDate() {
    const today = new Date();
    return {
        month: today.getMonth() + 1,
        day: today.getDate()
    };
}

function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function getPrimaryLink(event) {
    return event.links?.[0]?.link || `https://wikipedia.org/wiki/${encodeURIComponent(activeDateLabel.replace(' ', '_'))}`;
}

function getInterestScore(event) {
    const text = cleanText(event.text || '');
    const lower = text.toLowerCase();
    let score = 0;

    if (text.length >= 80) score += 2;
    if (event.links?.length >= 2) score += 2;
    if (/[0-9]/.test(text)) score += 1;

    INTERESTING_TERMS.forEach((term) => {
        if (lower.includes(term)) score += 3;
    });

    LOW_VALUE_TERMS.forEach((term) => {
        if (lower.includes(term)) score -= 4;
    });

    return score;
}

function classifyEvent(text) {
    const lower = text.toLowerCase();
    const rules = [
        ['전쟁/분쟁', ['war', 'battle', 'siege', 'invades', 'invasion', 'massacre', 'revolt', 'rebellion']],
        ['정치/혁명', ['revolution', 'independence', 'treaty', 'declares', 'elected', 'coup', 'government']],
        ['과학/기술', ['space', 'launched', 'mission', 'discovered', 'invention', 'nuclear', 'computer']],
        ['탐험/지리', ['expedition', 'discovers', 'reaches', 'voyage', 'navigation', 'explorer']],
        ['재난/사건', ['earthquake', 'erupts', 'explodes', 'sinks', 'fire', 'crash', 'disaster']],
        ['문화/사회', ['opens', 'founded', 'established', 'published', 'broadcast', 'university']]
    ];
    const match = rules.find(([, terms]) => terms.some((term) => lower.includes(term)));
    return match ? match[0] : '흥미로운 사건';
}

function getKoreanEventPhrase(text, category) {
    const lower = text.toLowerCase();
    if (category === '전쟁/분쟁') return '전쟁, 충돌, 군사 작전처럼 당시 권력 구도에 영향을 준 사건입니다';
    if (category === '정치/혁명') return '국가, 제도, 독립, 조약처럼 정치 질서의 변화를 보여주는 사건입니다';
    if (category === '과학/기술') return '과학 기술의 진전이나 우주·발견·발명과 연결된 사건입니다';
    if (category === '탐험/지리') return '탐험과 이동, 새로운 지역 인식의 확장을 보여주는 사건입니다';
    if (category === '재난/사건') return '사회에 큰 충격을 남긴 재난이나 대형 사건입니다';
    if (category === '문화/사회') return '문화, 교육, 사회 제도의 변화와 연결된 사건입니다';
    if (lower.includes('first')) return '무언가가 처음으로 기록되거나 시작된 의미 있는 사건입니다';
    if (lower.includes('end') || lower.includes('falls')) return '한 시대나 체제가 끝나는 흐름을 보여주는 사건입니다';
    return '단순한 인물 기록보다 역사적 맥락이 뚜렷한 사건입니다';
}

function buildKoreanTitle(event, category) {
    const subject = event.links?.[0]?.title;
    if (subject) return `${event.year}년, ${subject} 관련 ${category}`;
    return `${event.year}년의 ${category}`;
}

function buildKoreanContent(event, payload, category) {
    const subject = event.links?.[0]?.title || '이 사건';
    return `${payload.date}에 기록된 사건입니다. ${subject}와 관련해 ${getKoreanEventPhrase(event.text || '', category)}. 아래에 영어 원문을 함께 병기했습니다.`;
}

function normalizeRemoteEvents(payload) {
    const events = payload?.data?.Events || [];
    const ranked = events
        .map((event) => ({
            event,
            score: getInterestScore(event)
        }))
        .filter(({ event, score }) => score >= 3 && cleanText(event.text || '').length >= 45)
        .sort((a, b) => b.score - a.score)
        .slice(0, 24);

    const selected = ranked.length >= 8 ? ranked : events
        .map((event) => ({ event, score: getInterestScore(event) }))
        .filter(({ event }) => cleanText(event.text || '').length >= 45)
        .sort((a, b) => b.score - a.score)
        .slice(0, 18);

    return selected.map(({ event, score }) => {
        const text = cleanText(event.text || '');
        const category = classifyEvent(text);
        return {
            year: event.year,
            title: buildKoreanTitle(event, category),
            content: buildKoreanContent(event, payload, category),
            originalText: text,
            category,
            sourceUrl: getPrimaryLink(event),
            sourceName: 'Wikipedia',
            interestScore: score
        };
    });
}

async function fetchHistoryFacts(date) {
    const response = await fetch(`${REMOTE_HISTORY_BASE}/${date.month}/${date.day}`);
    if (!response.ok) {
        throw new Error('History API request failed');
    }
    const payload = await response.json();
    activeDateLabel = payload.date || `${date.month}/${date.day}`;
    const remoteFacts = normalizeRemoteEvents(payload);
    if (!remoteFacts.length) {
        throw new Error('No interesting history events found');
    }
    return remoteFacts;
}

function setLoadingState(message) {
    isLoading = true;
    newFactBtn.disabled = true;
    todayFactBtn.disabled = true;
    factYear.textContent = '불러오는 중';
    factCategory.textContent = '원격 데이터';
    factTitle.textContent = message;
    factContent.textContent = '흥미도가 높은 사건을 선별하고 있습니다.';
    factOriginal.hidden = true;
    factOriginal.textContent = '';
    factSource.hidden = true;
    factCounter.textContent = '';
    relatedList.innerHTML = '<p class="empty-state">잠시만 기다려주세요.</p>';
}

function clearLoadingState() {
    isLoading = false;
    newFactBtn.disabled = false;
    todayFactBtn.disabled = false;
}

async function loadRemoteFacts(date = getRandomDate(), message = '역사적 사건을 불러오는 중입니다') {
    if (isLoading) return;
    setLoadingState(message);

    try {
        facts = await fetchHistoryFacts(date);
        shownIndices = [];
        activeCategory = '전체';
        renderCategoryFilter();
        displayFact();
    } catch {
        facts = FACTS.map((fact) => ({
            ...fact,
            sourceUrl: 'https://history.muffinlabs.com/',
            sourceName: '내장 fallback'
        }));
        shownIndices = [];
        activeCategory = '전체';
        activeDateLabel = 'fallback';
        renderCategoryFilter();
        displayFact();
        factCounter.textContent += ' · 원격 데이터 연결 실패로 내장 데이터를 표시 중';
    } finally {
        clearLoadingState();
    }
}

function getFilteredFacts() {
    const query = historySearch.value.trim().toLowerCase();

    return facts
        .map((fact, index) => ({ fact, index }))
        .filter(({ fact }) => {
            const matchesCategory = activeCategory === '전체' || fact.category === activeCategory;
            const searchable = `${fact.year} ${fact.title} ${fact.content} ${fact.originalText || ''} ${fact.category} ${fact.sourceName || ''}`.toLowerCase();
            const matchesSearch = !query || searchable.includes(query);
            return matchesCategory && matchesSearch;
        });
}

function renderCategoryFilter() {
    const categories = ['전체', ...new Set(facts.map((fact) => fact.category))];

    categoryFilter.innerHTML = categories.map((category) => `
        <button class="filter-chip ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">
            ${category}
        </button>
    `).join('');
}

function renderRelatedFacts(currentIndex) {
    const filtered = getFilteredFacts()
        .filter(({ index }) => index !== currentIndex)
        .slice(0, 4);

    if (!filtered.length) {
        relatedList.innerHTML = '<p class="empty-state">현재 조건에서 더 보여줄 사실이 없습니다.</p>';
        return;
    }

    relatedList.innerHTML = filtered.map(({ fact, index }) => `
        <button class="related-item" type="button" data-index="${index}">
            <span>${fact.category}</span>
            <strong>${fact.title}</strong>
        </button>
    `).join('');
}

function displayFactByIndex(index) {
    const fact = facts[index];
    if (!shownIndices.includes(index)) {
        shownIndices.push(index);
    }

    factYear.textContent = fact.year;
    factCategory.textContent = fact.category;
    factTitle.textContent = fact.title;
    factContent.textContent = fact.content;
    if (fact.originalText) {
        factOriginal.textContent = `영어 원문: ${fact.originalText}`;
        factOriginal.hidden = false;
    } else {
        factOriginal.hidden = true;
        factOriginal.textContent = '';
    }
    factSource.href = fact.sourceUrl;
    factSource.textContent = `${fact.sourceName || '출처'}에서 원문 보기`;
    factSource.hidden = false;
    factCounter.textContent = `${shownIndices.length} / ${facts.length}${activeDateLabel ? ` · ${activeDateLabel}` : ''}`;
    renderRelatedFacts(index);
}

function getRandomFact() {
    const filtered = getFilteredFacts();

    if (!filtered.length) {
        return null;
    }

    const filteredIndices = filtered.map(({ index }) => index);
    const remaining = filteredIndices.filter((index) => !shownIndices.includes(index));
    const pool = remaining.length ? remaining : filteredIndices;
    const idx = pool[Math.floor(Math.random() * pool.length)];
    return idx;
}

function displayFact() {
    const idx = getRandomFact();

    if (idx === null) {
        factYear.textContent = '—';
        factCategory.textContent = '검색 결과 없음';
        factTitle.textContent = '조건에 맞는 역사적 사실이 없습니다';
        factContent.textContent = '검색어를 줄이거나 카테고리를 전체로 변경해보세요.';
        factOriginal.hidden = true;
        factOriginal.textContent = '';
        factSource.hidden = true;
        factCounter.textContent = `0 / ${facts.length}`;
        relatedList.innerHTML = '';
        return;
    }

    displayFactByIndex(idx);
}

function displayTodayFact() {
    loadRemoteFacts(getTodayDate(), '오늘의 역사적 사건을 불러오는 중입니다');
}

categoryFilter.addEventListener('click', function (event) {
    const button = event.target.closest('.filter-chip');
    if (!button) return;

    activeCategory = button.dataset.category;
    renderCategoryFilter();
    displayFact();
});

historySearch.addEventListener('input', function () {
    displayFact();
});

relatedList.addEventListener('click', function (event) {
    const button = event.target.closest('.related-item');
    if (!button) return;
    displayFactByIndex(Number(button.dataset.index));
});

newFactBtn.addEventListener('click', function () {
    loadRemoteFacts(getRandomDate(), '랜덤 날짜의 역사적 사건을 불러오는 중입니다');
});
todayFactBtn.addEventListener('click', displayTodayFact);
loadRemoteFacts(getTodayDate(), '오늘의 역사적 사건을 불러오는 중입니다');
