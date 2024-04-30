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
