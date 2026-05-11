// Function to generate random lotto numbers
function generateLottoNumbers() {
    const numbers = Array.from({length: 45}, (_, i) => i + 1);
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    // Select 7 numbers: 6 main + 1 bonus
    const selected = numbers.slice(0, 7);
    const mainNumbers = selected.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = selected[6];
    return { mainNumbers, bonusNumber };
}

document.getElementById('generateBtn').addEventListener('click', function() {
    const { mainNumbers, bonusNumber } = generateLottoNumbers();
    document.getElementById('lottoDisplay').textContent = `Main Numbers: ${mainNumbers.join(', ')} | Bonus: ${bonusNumber}`;
});