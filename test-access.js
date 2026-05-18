const TEST_ACCESS_HASH = '211336fe4158487bd91c2b5ca8bcbe4291d1f53a0e52dbd0bee38951080d114b';
const TEST_ACCESS_SESSION = 'inner-hatch-test-access';

const accessGate = document.getElementById('accessGate');
const accessInput = document.getElementById('testAccessCode');
const unlockTestBtn = document.getElementById('unlockTestBtn');
const accessStatus = document.getElementById('accessStatus');
const protectedArea = document.querySelector('.test-protected');

async function hashAccessCode(value) {
    const encoded = new TextEncoder().encode(value.trim());
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}

function unlockTestArea() {
    document.body.classList.remove('access-locked');
    if (accessGate) accessGate.hidden = true;
    if (protectedArea) {
        protectedArea.removeAttribute('aria-hidden');
    }
}

async function tryUnlock() {
    const hashed = await hashAccessCode(accessInput.value);
    if (hashed === TEST_ACCESS_HASH) {
        sessionStorage.setItem(TEST_ACCESS_SESSION, 'ok');
        unlockTestArea();
        return;
    }
    accessStatus.textContent = '접근 코드가 맞지 않습니다.';
    accessInput.value = '';
    accessInput.focus();
}

if (sessionStorage.getItem(TEST_ACCESS_SESSION) === 'ok') {
    unlockTestArea();
}

if (unlockTestBtn) {
    unlockTestBtn.addEventListener('click', tryUnlock);
}

if (accessInput) {
    accessInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            tryUnlock();
        }
    });
}
