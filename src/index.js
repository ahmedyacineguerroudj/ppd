window.addEventListener('DOMContentLoaded', (event) => {
    const checkBtn = document.getElementById('check');
    const navUl = document.querySelector('nav ul');

    checkBtn.addEventListener('change', () => {
        if (checkBtn.checked) {
            navUl.style.left = '0';
        } else {
            navUl.style.left = '-100%';
        }
    });
});
