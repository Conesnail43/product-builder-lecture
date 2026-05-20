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

let activeStoryIndex = 0;
let visibleRuleCount = 1;

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

napolitanStories.forEach((story, index) => {
    const button = document.createElement('button');
    button.className = 'story-button';
    button.type = 'button';
    button.innerHTML = `<span>${story.place}</span><strong>${story.title}</strong>`;
    button.addEventListener('click', () => renderStory(index));
    storyList.appendChild(button);
});

nextRuleBtn.addEventListener('click', showNextRule);
revealAllBtn.addEventListener('click', revealAllRules);
sealBtn.addEventListener('click', sealDocument);

renderStory(0);
