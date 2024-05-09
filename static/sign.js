const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const loginRadio = document.querySelector("#login");
const signupRadio = document.querySelector("#signup");
const sliderTab = document.querySelector(".slider-tab");



var login_submit = document.getElementById("signin1");
var signup_submit = document.getElementById("signup2");
var login_email = document.getElementById("login_email");
var login_password = document.getElementById("login_password");

var signup_email = document.getElementById("signup_email");
var signup_password = document.getElementById("signup_password");
var signup_first_name = document.getElementById("signup_first_name");
var signup_last_name = document.getElementById("signup_last_name");
var signup_birthdate = document.getElementById("birthdate");






login_submit.addEventListener('click', function(event) {
    event.defaultPrevented

    var data  = {

        operation:"signin",
        login_email: login_email.value.trim(),
        login_password: login_password.value.trim(),
    };

    senddata(data);
});
signup_submit.addEventListener('click', function() {

    var data = {
        operation:'signup',
        login_email: signup_email.value,
        login_password: signup_password.value,
        signup_first_name: signup_first_name.value,
        signup_last_name: signup_last_name.value,
        signup_birthdate: signup_birthdate.value,
    };
    senddata(data);
});


function senddata(data) {
    console.log('Sending data to backend:', data);
    alert(data.login_password)
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/sign/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/plain',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ data: data})
    })

        .then(response => {
            if(response.redirected){

                var dataToSend = { key3: true };

                localStorage.setItem('myData3', JSON.stringify(dataToSend));

                window.location.href = new URL("/home",window.location.href)

            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response;
        })
        .then(data => {

        })

}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var retrievedData = localStorage.getItem('myData');
var parsedData = JSON.parse(retrievedData);

var retrievedData2 = localStorage.getItem('myData2');
var parsedData2;

if (retrievedData2 !== null) {
    parsedData2 = JSON.parse(retrievedData2);
    signup_email.value=parsedData2.email
}


let isLoginActive = parsedData.key1;

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



