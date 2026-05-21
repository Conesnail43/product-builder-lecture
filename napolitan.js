const napolitanStories = [
    {
        title: '심야 엘리베이터 점검 안내',
        place: '은하빌딩 B동',
        level: '주의',
        intro: '아래 수칙은 매일 23:40 이후 B동 엘리베이터를 이용하는 입주자와 야간 경비 직원을 위한 안내입니다.',
        rules: [
            '23:40부터 04:10까지는 4호기를 사용하지 마십시오. 4호기는 해당 시간대에 운행 기록이 남지 않습니다.',
            '엘리베이터 안의 층수 표시가 13층을 지나 12층으로 내려가면 즉시 열림 버튼을 누르고 가장 가까운 층에서 내리십시오.',
            '문이 열렸을 때 복도 조명이 붉게 보이면 내리지 마십시오. 해당 층은 B동에 존재하지 않습니다.',
            '동승자가 거울에 비치지 않더라도 말을 걸지 마십시오. 먼저 인사하면 목적지를 묻습니다.',
            '비상 통화 버튼에서 관리실 직원이 아닌 아이 목소리가 들리면 버튼을 한 번 더 누르지 마십시오.',
            '엘리베이터가 1층에 도착했는데 로비 시계가 03:33을 가리키면 문이 닫힐 때까지 뒤돌아보지 말고 기다리십시오.',
            '위 수칙을 지키지 못한 경우 관리실로 오지 마십시오. 관리실은 지하 2층에 없습니다.'
        ],
        anomalies: [
            '4호기 호출 버튼이 눌리지 않았는데도 점등되었습니다.',
            'CCTV 기록에 13층이 11초 동안 표시되었습니다.',
            '관리실 내선이 지하 2층에서 수신된 것으로 남았습니다.'
        ],
        note: '관리사무소는 B동 지하 2층 안내 표지판을 부착한 적이 없습니다.'
    },
    {
        title: '도서관 지하 서고 열람 규칙',
        place: '무연시립도서관',
        level: '열람 제한',
        intro: '지하 서고는 폐가식 자료 보관실입니다. 사전 허가를 받은 이용자만 아래 규칙에 따라 20분 이내로 열람할 수 있습니다.',
        rules: [
            '입장 전 데스크에서 받은 회색 열람증을 목에 걸어 주십시오. 검은 열람증을 받았다면 즉시 데스크 직원에게 반납하십시오.',
            '서고 안에서는 책 제목을 소리 내어 읽지 마십시오. 특히 제목이 손글씨로 고쳐진 책은 펼치지 마십시오.',
            '통로 끝에서 페이지 넘기는 소리가 들리면 그 방향의 조명을 끄고 반대편 출구로 이동하십시오.',
            '서가 번호가 0번으로 표시된 줄은 이용자 동선에 포함되지 않습니다. 0번 서가에서 사람을 보았다면 직원이라고 생각하지 마십시오.',
            '대출카드에 본인의 이름이 이미 적혀 있더라도 서명하지 마십시오. 해당 자료는 반납 처리된 적이 없습니다.',
            '퇴실 시 책갈피가 주머니에서 발견되면 안내 데스크에 맡기지 말고 1층 화장실 휴지통에 버리십시오.',
            '서고에서 나온 뒤에도 종이 냄새가 계속 난다면 오늘 읽은 문장을 아무에게도 설명하지 마십시오.'
        ],
        anomalies: [
            '열람증 발급 기록보다 반납 기록이 하나 더 많습니다.',
            '0번 서가 주변 온도가 4도 낮게 측정되었습니다.',
            '대출카드에 아직 입장하지 않은 이용자의 이름이 적혀 있습니다.'
        ],
        note: '지하 서고의 0번 서가는 도면에 없습니다. 관련 문의는 접수하지 않습니다.'
    },
    {
        title: '무인 편의점 야간 근무 매뉴얼',
        place: '24H 해송점',
        level: '근무자 전용',
        intro: '본 문서는 01:00부터 05:00까지 매장 점검을 맡은 야간 근무자를 위한 임시 매뉴얼입니다.',
        rules: [
            '01:17에 자동문이 열리더라도 손님이 없으면 인사하지 마십시오. 센서 오류로 기록되어야 합니다.',
            'CCTV 3번 화면의 계산대 앞에 사람이 서 있으면 실제 계산대 쪽을 보지 말고 화면만 확인하십시오.',
            '폐기 도시락 수량이 전산보다 하나 많을 경우 가장 위에 놓인 상품을 절대 열지 마십시오.',
            '검은 우산을 든 손님이 우산을 보관해 달라고 하면 “보관함이 없습니다”라고만 답하십시오.',
            '새벽 3시 이후 매장 음악이 동요로 바뀌면 전원을 끄지 말고 창고 문을 잠그십시오.',
            '진열대 사이에서 바코드 스캐너 소리가 들리면 POS 화면의 시간을 확인하십시오. 04:44라면 퇴근 버튼을 누르지 마십시오.',
            '교대자가 본인과 같은 얼굴로 들어오면 근무일지를 찢고 매장을 나가십시오. 다음 근무자는 이미 도착한 것입니다.'
        ],
        anomalies: [
            '자동문 개폐 기록은 있으나 입장 객체가 감지되지 않았습니다.',
            '폐기 도시락 라벨의 제조 시간이 내일 새벽으로 출력되었습니다.',
            'CCTV 3번 화면의 계산대 위치가 실제 매장 구조와 다릅니다.'
        ],
        note: '본 매장은 우산 보관 서비스를 제공하지 않으며, 교대자는 반드시 점장과 동행합니다.'
    },
    {
        title: 'B구역 캠핑장 이용 안내',
        place: '청록호 캠핑장',
        level: '숙박객 안내',
        intro: 'B구역은 숲과 호수에 가까운 조용한 구역입니다. 안전한 숙박을 위해 다음 안내를 확인해 주십시오.',
        rules: [
            '밤 10시 이후 호수 방향에서 이름을 부르는 소리가 들려도 대답하지 마십시오. 관리인은 무전기를 사용합니다.',
            '텐트 밖에 젖은 발자국이 원형으로 남아 있으면 랜턴을 끄고 10분 동안 움직이지 마십시오.',
            '공용 개수대 거울에 본인의 텐트 번호가 보이면 해당 번호판을 떼어 안내소에 반납하십시오.',
            '새벽에 아이가 장작을 빌려 달라고 하면 장작함 위치를 알려 주지 마십시오. B구역에는 미성년 숙박객이 없습니다.',
            '호수에서 종소리가 세 번 들리면 모든 지퍼를 닫고 휴대전화 화면 밝기를 최저로 낮추십시오.',
            '아침에 텐트 입구가 호수 방향으로 돌아가 있다면 직접 철수하지 말고 안내소 직원을 부르십시오.',
            '안내소 직원이 젖은 옷을 입고 오면 직원증을 확인하지 말고 A구역 주차장으로 이동하십시오.'
        ],
        anomalies: [
            'B구역 호수 방향에서 숙박객 이름을 부르는 음성이 녹음되었습니다.',
            '젖은 발자국은 텐트 안쪽에서 시작된 것으로 보입니다.',
            '안내소 직원 명단에 야간 순찰자가 없습니다.'
        ],
        note: 'B구역에는 종이 설치되어 있지 않습니다. 호수 수위 점검은 낮 시간에만 진행됩니다.'
    },
    {
        title: '새벽 방송실 운영 수칙',
        place: '동문고등학교',
        level: '동아리 공지',
        intro: '시험 기간 새벽 자율학습 방송은 방송부 2학년만 담당합니다. 아래 수칙은 방송실 열쇠를 받은 학생에게만 공개됩니다.',
        rules: [
            '방송실 문을 열기 전 안에서 마이크 테스트 소리가 들리면 열쇠를 돌리지 말고 교무실로 돌아가십시오.',
            '믹서의 6번 채널은 항상 음소거 상태로 두십시오. 해당 채널은 어떤 장비에도 연결되어 있지 않습니다.',
            '05:20 안내 방송 전 원고에 없는 문장이 모니터에 뜨면 읽지 말고 화면을 닫으십시오.',
            '스피커에서 자신의 목소리가 1초 늦게 들리는 것은 정상입니다. 1초 먼저 들리면 즉시 송출을 중단하십시오.',
            '창밖 운동장에 전교생이 서 있는 것처럼 보여도 커튼을 열어 확인하지 마십시오.',
            '방송 종료 후 녹음 파일 길이가 실제 방송보다 길다면 마지막 3분은 재생하지 말고 삭제하십시오.',
            '방송실을 나설 때 출석부에 모르는 이름이 추가되어 있으면 지우지 마십시오. 다음 담당자가 확인할 것입니다.'
        ],
        anomalies: [
            '6번 채널의 입력 레벨이 방송 시작 전부터 움직이고 있습니다.',
            '녹음 파일 끝에 아직 송출하지 않은 안내 멘트가 포함되어 있습니다.',
            '출석부 마지막 줄의 필압이 점점 진해지고 있습니다.'
        ],
        note: '동문고등학교 방송실에는 6번 채널 장비가 배정된 적이 없습니다.'
    }
];

const storyList = document.getElementById('storyList');
const consoleStatus = document.getElementById('consoleStatus');
const signalLabel = document.getElementById('signalLabel');
const signalFill = document.getElementById('signalFill');
const documentStamp = document.getElementById('documentStamp');
const storyTitle = document.getElementById('storyTitle');
const storyPlace = document.getElementById('storyPlace');
const storyLevel = document.getElementById('storyLevel');
const storyProgress = document.getElementById('storyProgress');
const storyIntro = document.getElementById('storyIntro');
const storyRules = document.getElementById('storyRules');
const storyNote = document.getElementById('storyNote');
const nextRuleBtn = document.getElementById('nextRuleBtn');
const revealAllBtn = document.getElementById('revealAllBtn');
const sealBtn = document.getElementById('sealBtn');
const anomalyPanel = document.getElementById('anomalyPanel');
const anomalyText = document.getElementById('anomalyText');
const archiveModeBtn = document.getElementById('archiveModeBtn');
const escapeModeBtn = document.getElementById('escapeModeBtn');
const archivePanels = document.querySelectorAll('.archive-panel');
const escapePanel = document.getElementById('escapePanel');
const restartEscapeBtn = document.getElementById('restartEscapeBtn');
const escapeClock = document.getElementById('escapeClock');
const inventoryList = document.getElementById('inventoryList');
const escapeRiskFill = document.getElementById('escapeRiskFill');
const escapeRiskLabel = document.getElementById('escapeRiskLabel');
const sceneTag = document.getElementById('sceneTag');
const sceneEnding = document.getElementById('sceneEnding');
const sceneTitle = document.getElementById('sceneTitle');
const sceneText = document.getElementById('sceneText');
const sceneNotice = document.getElementById('sceneNotice');
const choiceList = document.getElementById('choiceList');

let activeStoryIndex = 0;
let visibleRuleCount = 1;
let escapeState = {
    sceneId: 'start',
    inventory: [],
    risk: 0
};

function appendTextElement(parent, tagName, text) {
    const element = document.createElement(tagName);
    element.textContent = text;
    parent.appendChild(element);
    return element;
}

const escapeScenes = {
    start: {
        time: '01:00',
        tag: '근무 시작',
        title: '해송점의 새벽',
        text: '점장은 매뉴얼 한 장과 열쇠를 남기고 퇴근했습니다. POS 화면에는 “05:00 이전 퇴근 금지”라는 문구가 깜박입니다.',
        choices: [
            { label: '야간 매뉴얼을 먼저 읽는다', next: 'manual', item: '야간 매뉴얼' },
            { label: '바로 매장 순찰을 시작한다', next: 'aisle', risk: 12, notice: '읽지 않은 규칙은 보통 나중에 더 비싸게 돌아옵니다.' }
        ]
    },
    manual: {
        time: '01:08',
        tag: '문서 확인',
        title: '근무자 전용 매뉴얼',
        text: '01:17 자동문에 인사하지 말 것. CCTV 3번만 확인할 것. 검은 우산은 보관하지 말 것. 04:44에는 퇴근 버튼을 누르지 말 것.',
        choices: [
            { label: '매뉴얼을 접고 CCTV 화면을 켠다', next: 'door', item: 'CCTV 3번 기록' },
            { label: '매뉴얼 뒷면의 작은 글씨를 확인한다', next: 'backside', item: '뒷면 암호 344' }
        ]
    },
    backside: {
        time: '01:12',
        tag: '추가 규칙',
        title: '뒷면의 작은 글씨',
        text: '“스캐너 소리가 세 번 들리면 폐기 도시락 라벨의 시간을 POS에 입력하십시오. 단, 04:44는 입력하지 마십시오.”',
        choices: [
            { label: 'CCTV 3번 화면으로 돌아간다', next: 'door', item: '폐기 라벨 단서' },
            { label: '폐기 도시락부터 확인한다', next: 'lunch', item: '폐기 도시락 라벨' }
        ]
    },
    door: {
        time: '01:17',
        tag: '자동문 감지',
        title: '어서 오세요가 목까지 올라옵니다',
        text: '자동문이 열렸습니다. 매장에는 아무도 없습니다. 하지만 CCTV 3번 화면의 계산대 앞에는 누군가 서 있습니다.',
        choices: [
            { label: '어서 오세요라고 말한다', next: 'badGreeting', risk: 100 },
            { label: 'CCTV 3번 화면만 확인한다', next: 'cctv', item: '빈 손님 영상' },
            { label: '실제 계산대 쪽을 본다', next: 'badCounter', risk: 80 }
        ]
    },
    cctv: {
        time: '01:33',
        tag: 'CCTV 3번',
        title: '화면 속 계산대',
        text: '화면 속 손님은 고개를 숙이고 있습니다. 손에는 검은 우산이 있고, 우산 손잡이에 344라는 숫자가 붙어 있습니다.',
        choices: [
            { label: '344를 메모한다', next: 'umbrella', item: '우산 번호 344' },
            { label: '화면 속 손님에게 손을 흔든다', next: 'badCounter', risk: 60 }
        ]
    },
    umbrella: {
        time: '02:06',
        tag: '검은 우산',
        title: '젖지 않은 우산',
        text: '자동문 옆에 검은 우산이 세워져 있습니다. 바닥은 말라 있는데 우산 끝에서 물이 떨어집니다.',
        choices: [
            { label: '보관함이 없다고 말한다', next: 'music', item: '거절 완료' },
            { label: '창고에 보관한다', next: 'badUmbrella', risk: 90 },
            { label: '우산 손잡이 번호를 POS에 입력한다', next: 'scanner', requires: '우산 번호 344', notice: 'POS가 344를 임시 점검 코드로 인식했습니다.' }
        ]
    },
    music: {
        time: '03:00',
        tag: '매장 음악',
        title: '동요가 재생됩니다',
        text: '스피커에서 처음 듣는 동요가 흘러나옵니다. 창고 문 안쪽에서 바코드 스캐너 소리가 한 번 들립니다.',
        choices: [
            { label: '창고 문을 잠근다', next: 'scanner', item: '잠긴 창고' },
            { label: '음악 전원을 끈다', next: 'badMusic', risk: 75 },
            { label: '폐기 도시락 라벨을 확인한다', next: 'lunch', item: '폐기 도시락 라벨' }
        ]
    },
    lunch: {
        time: '03:21',
        tag: '폐기 확인',
        title: '내일 제조된 도시락',
        text: '가장 위 도시락 라벨에는 제조 시간이 04:44로 찍혀 있습니다. 수량은 전산보다 하나 많습니다.',
        choices: [
            { label: '라벨만 떼어 POS 옆에 둔다', next: 'scanner', item: '04:44 라벨' },
            { label: '도시락을 열어 본다', next: 'badLunch', risk: 85 }
        ]
    },
    scanner: {
        time: '04:44',
        tag: '퇴근 버튼 잠김',
        title: '스캐너 소리 세 번',
        text: '진열대 사이에서 삑, 삑, 삑. POS 화면의 퇴근 버튼이 붉게 켜집니다. 지금 누르면 안 된다는 규칙이 떠오릅니다.',
        choices: [
            { label: '퇴근 버튼을 누른다', next: 'badCheckout', risk: 100 },
            { label: '04:44 라벨을 스캔한다', next: 'logbook', requires: '04:44 라벨', item: '스캔된 라벨' },
            { label: '344 점검 코드를 입력한다', next: 'logbook', requires: '우산 번호 344', item: '점검 코드 승인' },
            { label: '아무것도 하지 않고 05:00까지 기다린다', next: 'double', risk: 30 }
        ]
    },
    logbook: {
        time: '04:58',
        tag: '근무일지',
        title: '찢어진 근무일지',
        text: '근무일지 마지막 줄에 당신의 이름이 이미 적혀 있습니다. 그 아래에는 “교대자가 도착하면 얼굴을 확인하지 말 것”이라고 쓰여 있습니다.',
        choices: [
            { label: '근무일지를 찢고 매장을 나간다', next: 'goodEnding', item: '찢어진 근무일지' },
            { label: '교대자의 얼굴을 확인한다', next: 'badDouble', risk: 100 },
            { label: '관리실에 전화를 건다', next: 'recordedEnding', risk: 35 }
        ]
    },
    double: {
        time: '05:00',
        tag: '교대',
        title: '같은 얼굴',
        text: '자동문이 열리고 당신과 같은 얼굴의 교대자가 들어옵니다. 그는 웃으며 “늦으셨네요”라고 말합니다.',
        choices: [
            { label: '근무일지를 찢는다', next: 'goodEnding', requires: '야간 매뉴얼' },
            { label: '왜 내 얼굴이냐고 묻는다', next: 'badDouble', risk: 100 }
        ]
    },
    goodEnding: {
        time: '05:01',
        tag: 'END 1',
        title: '정상 탈출',
        text: '당신은 근무일지를 찢고 매장을 나왔습니다. 뒤에서 자동문이 열리는 소리가 났지만, 돌아보지 않았습니다.',
        ending: '생존',
        choices: []
    },
    recordedEnding: {
        time: '05:00',
        tag: 'END 2',
        title: '매장에 기록됨',
        text: '수화기 너머의 목소리가 당신의 근무 시작 시간을 묻습니다. POS 화면에는 내일 01:00 근무자로 당신의 이름이 다시 등록됩니다.',
        ending: '반복',
        choices: []
    },
    badGreeting: {
        time: '01:17',
        tag: 'END 3',
        title: '응답',
        text: '“어서 오세요”라는 말이 매장 스피커에서 한 박자 늦게 반복됩니다. CCTV 3번 화면의 손님이 고개를 듭니다.',
        ending: '규칙 위반',
        choices: []
    },
    badCounter: {
        time: '01:18',
        tag: 'END 4',
        title: '화면 밖의 계산대',
        text: '실제 계산대 앞에는 아무도 없습니다. 화면 속 계산대 앞에는 당신이 서 있습니다.',
        ending: '전환',
        choices: []
    },
    badUmbrella: {
        time: '02:07',
        tag: 'END 5',
        title: '보관된 우산',
        text: '창고 문을 닫자 안쪽에서 빗소리가 납니다. 해송점에는 창문이 없습니다.',
        ending: '봉인 실패',
        choices: []
    },
    badMusic: {
        time: '03:01',
        tag: 'END 6',
        title: '끊긴 음악',
        text: '전원을 끄자 매장이 너무 조용해집니다. 이제 스캐너 소리가 어디서 나는지 정확히 들립니다. 바로 뒤입니다.',
        ending: '규칙 위반',
        choices: []
    },
    badLunch: {
        time: '03:22',
        tag: 'END 7',
        title: '열린 도시락',
        text: '도시락 안에는 음식 대신 접힌 영수증이 있습니다. 결제 시간은 내일 04:44, 상품명은 당신의 이름입니다.',
        ending: '기록됨',
        choices: []
    },
    badCheckout: {
        time: '04:44',
        tag: 'END 8',
        title: '조기 퇴근',
        text: '퇴근 처리가 완료되었습니다. 자동문은 열리지 않고, POS는 다음 근무자 이름을 출력합니다. 당신입니다.',
        ending: '폐점',
        choices: []
    },
    badDouble: {
        time: '05:00',
        tag: 'END 9',
        title: '교대자',
        text: '그는 당신보다 먼저 인사합니다. 그리고 당신이 해야 했던 대답을 정확히 알고 있습니다.',
        ending: '대체',
        choices: []
    }
};

function renderStory(index) {
    const story = napolitanStories[index];
    if (!story) return;

    activeStoryIndex = index;
    visibleRuleCount = 1;

    document.querySelectorAll('.story-button').forEach((button, buttonIndex) => {
        button.classList.toggle('active', buttonIndex === index);
    });

    documentStamp.textContent = 'OPENED';
    storyTitle.textContent = story.title;
    storyPlace.textContent = story.place;
    storyLevel.textContent = story.level;
    storyIntro.textContent = story.intro;
    storyNote.textContent = story.note;
    updateRuleView();
}

function updateRuleView() {
    const story = napolitanStories[activeStoryIndex];
    const progress = Math.round((visibleRuleCount / story.rules.length) * 100);

    storyRules.innerHTML = '';
    story.rules.slice(0, visibleRuleCount).forEach((rule, ruleIndex) => {
        const item = document.createElement('li');
        item.textContent = rule;
        item.style.setProperty('--rule-delay', `${ruleIndex * 45}ms`);
        storyRules.appendChild(item);
    });

    storyProgress.textContent = `${visibleRuleCount}/${story.rules.length}`;
    signalLabel.textContent = `${progress}%`;
    signalFill.style.width = `${progress}%`;
    documentStamp.textContent = visibleRuleCount === story.rules.length ? 'DO NOT COPY' : 'OPENED';
    consoleStatus.textContent = visibleRuleCount === story.rules.length
        ? '문서 전체 열람됨'
        : `${story.place} 규칙 ${visibleRuleCount}개 열람`;

    const anomalyIndex = Math.min(
        story.anomalies.length - 1,
        Math.floor((visibleRuleCount - 1) / Math.ceil(story.rules.length / story.anomalies.length))
    );
    anomalyText.textContent = story.anomalies[anomalyIndex];
    anomalyPanel.classList.toggle('warning', progress >= 72);

    nextRuleBtn.disabled = visibleRuleCount >= story.rules.length;
    revealAllBtn.disabled = visibleRuleCount >= story.rules.length;
}

function showNextRule() {
    const story = napolitanStories[activeStoryIndex];
    visibleRuleCount = Math.min(story.rules.length, visibleRuleCount + 1);
    updateRuleView();
}

function revealAllRules() {
    visibleRuleCount = napolitanStories[activeStoryIndex].rules.length;
    updateRuleView();
}

function sealDocument() {
    visibleRuleCount = 1;
    updateRuleView();
    documentStamp.textContent = 'SEALED';
    consoleStatus.textContent = '문서 봉인됨';
}

function setNapolitanMode(mode) {
    const isArchive = mode === 'archive';
    archivePanels.forEach((panel) => {
        panel.hidden = !isArchive;
    });
    escapePanel.hidden = isArchive;
    archiveModeBtn.classList.toggle('active', isArchive);
    escapeModeBtn.classList.toggle('active', !isArchive);
    archiveModeBtn.setAttribute('aria-selected', String(isArchive));
    escapeModeBtn.setAttribute('aria-selected', String(!isArchive));
}

function resetEscape() {
    escapeState = {
        sceneId: 'start',
        inventory: [],
        risk: 0
    };
    renderEscapeScene();
}

function addInventory(item) {
    if (item && !escapeState.inventory.includes(item)) {
        escapeState.inventory.push(item);
    }
}

function renderInventory() {
    inventoryList.innerHTML = '';
    if (!escapeState.inventory.length) {
        const empty = document.createElement('p');
        empty.textContent = '아직 확보한 단서가 없습니다.';
        inventoryList.appendChild(empty);
        return;
    }

    escapeState.inventory.forEach((item) => {
        const badge = document.createElement('span');
        badge.textContent = item;
        inventoryList.appendChild(badge);
    });
}

function renderEscapeScene(notice = '') {
    const scene = escapeScenes[escapeState.sceneId];
    if (!scene) return;

    escapeClock.textContent = scene.time;
    sceneTag.textContent = scene.tag;
    sceneEnding.textContent = scene.ending ? scene.ending : '';
    sceneEnding.hidden = !scene.ending;
    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;
    escapeRiskFill.style.width = `${Math.min(100, escapeState.risk)}%`;
    escapeRiskLabel.textContent = escapeState.risk >= 70
        ? '위험: 규칙이 이미 당신을 인식했습니다.'
        : escapeState.risk >= 30
            ? '주의: 규칙 위반 가능성이 누적 중입니다.'
            : '규칙 위반 없음';

    sceneNotice.hidden = !notice;
    sceneNotice.textContent = notice;
    renderInventory();

    choiceList.innerHTML = '';
    if (!scene.choices.length) {
        const restart = document.createElement('button');
        restart.className = 'choice-button';
        restart.type = 'button';
        restart.textContent = '다시 근무 시작';
        restart.addEventListener('click', resetEscape);
        choiceList.appendChild(restart);
        return;
    }

    scene.choices.forEach((choice) => {
        const button = document.createElement('button');
        const hasRequiredItem = !choice.requires || escapeState.inventory.includes(choice.requires);
        button.className = 'choice-button';
        button.type = 'button';
        button.disabled = !hasRequiredItem;
        button.textContent = hasRequiredItem ? choice.label : `${choice.label} - ${choice.requires} 필요`;
        button.addEventListener('click', () => chooseEscapeOption(choice));
        choiceList.appendChild(button);
    });
}

function chooseEscapeOption(choice) {
    addInventory(choice.item);
    escapeState.risk = Math.min(100, escapeState.risk + (choice.risk || 0));
    escapeState.sceneId = choice.next;
    renderEscapeScene(choice.notice || '');
}

napolitanStories.forEach((story, index) => {
    const button = document.createElement('button');
    button.className = 'story-button';
    button.type = 'button';
    appendTextElement(button, 'span', story.place);
    appendTextElement(button, 'strong', story.title);
    button.addEventListener('click', () => renderStory(index));
    storyList.appendChild(button);
});

nextRuleBtn.addEventListener('click', showNextRule);
revealAllBtn.addEventListener('click', revealAllRules);
sealBtn.addEventListener('click', sealDocument);
archiveModeBtn.addEventListener('click', () => setNapolitanMode('archive'));
escapeModeBtn.addEventListener('click', () => setNapolitanMode('escape'));
restartEscapeBtn.addEventListener('click', resetEscape);

renderStory(0);
resetEscape();
