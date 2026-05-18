const generateBtn = document.getElementById('generateBtn');
const multiGameToggle = document.getElementById('multiGameToggle');
const ticketsEl = document.getElementById('tickets');

function generateLottoNumbers() {
    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    const selected = numbers.slice(0, 7);
    return {
        mainNumbers: selected.slice(0, 6).sort((a, b) => a - b),
        bonusNumber: selected[6]
    };
}

function getLottoColorClass(number) {
    if (number <= 10) return 'ball-yellow';
    if (number <= 20) return 'ball-blue';
    if (number <= 30) return 'ball-red';
    if (number <= 40) return 'ball-gray';
    return 'ball-green';
}

function createLottoBall(number) {
    return `<span class="ball ${getLottoColorClass(number)}">${number}</span>`;
}

function renderLottoTicket(game, index, isCompact) {
    const mainBalls = game.mainNumbers.map(createLottoBall).join('');
    const bonusClass = getLottoColorClass(game.bonusNumber);

    if (isCompact) {
        return `
            <div class="ticket compact">
                <span class="game-label">${index + 1}게임</span>
                <div class="number-line">
                    <div class="balls">${mainBalls}</div>
                    <span class="plus">+</span>
                    <div class="bonus-ball ${bonusClass}">${game.bonusNumber}</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="game-label">${index + 1}게임</span>
            </div>
            <div class="balls">${mainBalls}</div>
            <div class="bonus-row">
                <span class="plus">+</span>
                <div class="bonus-ball ${bonusClass}">${game.bonusNumber}</div>
            </div>
        </div>
    `;
}

function renderLottoPlaceholder() {
    ticketsEl.innerHTML = `
        <div class="ticket">
            <div class="ticket-header">
                <span class="ticket-mark">LOTTO</span>
                <span class="game-label">대기 중</span>
            </div>
            <div class="balls">
                ${Array(6).fill('<span class="ball placeholder">?</span>').join('')}
            </div>
            <div class="bonus-row">
                <span class="plus">+</span>
                <div class="bonus-ball placeholder">?</div>
            </div>
        </div>
    `;
}

function renderLottoGames() {
    const gameCount = multiGameToggle.checked ? 5 : 1;
    const games = Array.from({ length: gameCount }, generateLottoNumbers);
    const isCompact = games.length > 1;
    ticketsEl.innerHTML = games.map((game, i) => renderLottoTicket(game, i, isCompact)).join('');
}

function updateGenerateButtonText() {
    generateBtn.textContent = multiGameToggle.checked ? '5게임 뽑기' : '번호 뽑기';
}

generateBtn.addEventListener('click', renderLottoGames);
multiGameToggle.addEventListener('change', updateGenerateButtonText);

updateGenerateButtonText();
renderLottoPlaceholder();
