const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginRadio = document.querySelector("#login");
const signupRadio = document.querySelector("#signup");
const sliderTab = document.querySelector(".slider-tab");

let isLoginActive = true;

function updateView() {
    if (isLoginActive) {
        loginForm.style.marginLeft = "0%";
        signupForm.style.marginLeft = "0%";
        loginRadio.checked = true;
        signupRadio.checked = false;
        sliderTab.style.left = "0%";
    } else {
        loginForm.style.marginLeft = "-50%";
        signupForm.style.marginLeft = "0%";
        loginRadio.checked = false;
        signupRadio.checked = true;
        sliderTab.style.left = "50%";
    }
}


updateView();

loginBtn.addEventListener("click", () => {
    isLoginActive = true;
    updateView();
});

signupBtn.addEventListener("click", () => {
    isLoginActive = false;
    updateView();
});


signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    isLoginActive = false;
    updateView();
});








document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form.signup');
    const verificationModal = document.getElementById('verificationModal');
    const closeModal = document.querySelector('.modal .close');
    const verifyCodeButton = document.getElementById('verifyCodeButton');
    let formSubmitted = false; // Variable pour suivre si le formulaire a déjà été soumis

    function showModal() {
        verificationModal.style.display = 'block';
    }

    function hideModal() {
        verificationModal.style.display = 'none';
    }

    closeModal.addEventListener('click', hideModal);
    window.addEventListener('click', function (event) {
        if (event.target === verificationModal) {
            hideModal();
        }
    });

    signupForm.addEventListener('submit', function (event) {
        if (!formSubmitted) {
            event.preventDefault();
            console.log('Verification code sent to email.');
            showModal();
        }
    });

    verifyCodeButton.addEventListener('click', function () {
        const verificationCode = document.getElementById('verificationCode').value;
        if (verificationCode === '123456') {
            hideModal();
            formSubmitted = true;
            signupForm.submit();
        } else {
            alert('Invalid verification code. Please try again.');
        }
    });
});

