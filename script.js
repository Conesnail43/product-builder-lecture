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

const body = document.body;
const generateBtn = document.getElementById('generateBtn');
const ticketsEl = document.getElementById('tickets');
const multiGameToggle = document.getElementById('multiGameToggle');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const toggleIcon = document.querySelector('.toggle-icon');
const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short'
}).format(new Date());

function getBallColorClass(number) {
    if (number <= 10) return 'ball-yellow';
    if (number <= 20) return 'ball-blue';
    if (number <= 30) return 'ball-red';
    if (number <= 40) return 'ball-gray';
    return 'ball-green';
}

function createBall(number, extraClass = '') {
    return `<span class="ball ${getBallColorClass(number)} ${extraClass}">${number}</span>`;
}

function renderTicket(game, index, isCompact) {
    const mainBalls = game.mainNumbers
        .map((number) => createBall(number))
        .join('');
    const bonusClass = getBallColorClass(game.bonusNumber);

    if (isCompact) {
        return `
            <div class="ticket compact">
                <span class="game-label">${index + 1}게임</span>
                <div class="number-line">
                    <div class="balls">
                        ${mainBalls}
                    </div>
                    <span class="plus">+</span>
                    <div class="bonus-ball active ${bonusClass}">${game.bonusNumber}</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="game-label">${index + 1}게임</span>
                <span class="ticket-date">${formattedDate}</span>
            </div>

            <div class="balls">
                ${mainBalls}
            </div>

            <div class="bonus-row">
                <span class="plus">+</span>
                <div class="bonus-ball active ${bonusClass}">${game.bonusNumber}</div>
            </div>
        </div>
    `;
}

function renderPlaceholderTicket() {
    return `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="ticket-date">${formattedDate}</span>
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
                <div class="bonus-ball">?</div>
            </div>
        </div>
    `;
}

function renderGames(games) {
    const isCompact = games.length > 1;
    ticketsEl.innerHTML = games
        .map((game, index) => renderTicket(game, index, isCompact))
        .join('');
}

function setTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    themeLabel.textContent = isDark ? 'Dark' : 'Light';
    toggleIcon.textContent = isDark ? '☾' : '☀';
    themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    localStorage.setItem('lotto-theme', theme);
}

function updateGenerateButtonText() {
    generateBtn.textContent = multiGameToggle.checked ? '5게임 뽑기' : '번호 뽑기';
}

generateBtn.addEventListener('click', function() {
    const gameCount = multiGameToggle.checked ? 5 : 1;
    const games = Array.from({ length: gameCount }, generateLottoNumbers);
    renderGames(games);
});

multiGameToggle.addEventListener('change', updateGenerateButtonText);

themeToggle.addEventListener('click', function() {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextTheme);
});

setTheme(localStorage.getItem('lotto-theme') || 'light');
updateGenerateButtonText();
ticketsEl.innerHTML = renderPlaceholderTicket();
