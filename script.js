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
const mainNumbersEl = document.getElementById('mainNumbers');
const bonusNumberEl = document.getElementById('bonusNumber');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const toggleIcon = document.querySelector('.toggle-icon');
const drawDate = document.getElementById('drawDate');

function renderNumbers(mainNumbers, bonusNumber) {
    mainNumbersEl.innerHTML = mainNumbers
        .map((number) => `<span class="ball">${number}</span>`)
        .join('');
    bonusNumberEl.textContent = bonusNumber;
    bonusNumberEl.classList.add('active');
}

function setTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    themeLabel.textContent = isDark ? 'Dark' : 'White';
    toggleIcon.textContent = isDark ? '☾' : '☀';
    themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    localStorage.setItem('lotto-theme', theme);
}

generateBtn.addEventListener('click', function() {
    const { mainNumbers, bonusNumber } = generateLottoNumbers();
    renderNumbers(mainNumbers, bonusNumber);
});

themeToggle.addEventListener('click', function() {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(nextTheme);
});

drawDate.textContent = new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short'
}).format(new Date());

setTheme(localStorage.getItem('lotto-theme') || 'light');
