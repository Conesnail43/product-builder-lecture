function setTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    const label = document.getElementById('themeLabel');
    const btn = document.getElementById('themeToggle');
    if (label) label.textContent = isDark ? 'Dark' : 'Light';
    if (btn) btn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    localStorage.setItem('sandbox-theme', theme);
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
    });
}

setTheme(localStorage.getItem('sandbox-theme') || 'light');

const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        formStatus.textContent = '전송 중입니다...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }

            contactForm.reset();
            formStatus.textContent = '문의가 전송되었습니다.';
        } catch (error) {
            formStatus.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
        } finally {
            submitButton.disabled = false;
        }
    });
}
