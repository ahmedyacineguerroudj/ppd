
getuserimage()

async function getuserimage() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/senduserinfo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        userinfo=data.user

        document.getElementById("userimage").src=userinfo.image;





    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
var firstname = document.getElementById('first-name');
var emaile = document.getElementById('emaile');
var lastname = document.getElementById('last-name');
var changefirstname = document.getElementById('changefirstname');
var changeemail = document.getElementById('changeemail');
var changelastname = document.getElementById('changelastname');
var DisableAccount = document.getElementById('DisableAccount');
document.getElementById("confirmation-popup").style.display = 'none';
let visacards=[]
async function recivevisacars() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendallvisacard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        visacards=JSON.stringify(data.visacads)
        visacards = JSON.parse(visacards)



    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}


DisableAccount.addEventListener('click', function() {

    var data = {
        edit:'DisableAccount',
    };

    sendselldata(data);
});





changefirstname.addEventListener('click', function() {

    var data = {
        edit:'firstname',
        firstname: firstname.value,

    };

    sendselldata(data);
});

changelastname.addEventListener('click', function() {

    var data = {
        edit:'lastname',
        lastname: lastname.value,

    };

    sendselldata(data);
});
changeemail.addEventListener('click', function() {

    var data = {
        edit:'email',
        email: emaile.value,

    };

    sendselldata(data);
});




function sendselldata(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/settings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}

function checkpassword(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/settings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           var p=data.message

            if (p) {

                var nextButton = document.getElementById('next-button');
                nextButton.removeAttribute('disabled');


                var currentPopup = document.getElementById('popup4');
                currentPopup.classList.remove('active');

                var nextPopup = document.getElementById('popup5');
                nextPopup.classList.add('active');
            } else {

                var popupMessage = document.getElementById('popup-message');
                popupMessage.textContent = 'Old password is incorrect.';
                popupMessage.style.display = 'block';
            }

        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}
function checkcode(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/settings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ data: data})
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           var p=data.message

            if (p) {

                closeModal5();
                openPopup6();
            } else {

                var popupMessage = document.getElementById('popup-message-confirmation');
                popupMessage.textContent = 'Incorrect confirmation code !';
                popupMessage.style.display = 'block';
            }


        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
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
//
//
// Vous pouvez également utiliser JavaScript pour masquer le spinner une fois que la page est entièrement chargée
window.addEventListener('load', function() {
    var spinner = document.querySelector('.loading-overlay');
    spinner.style.display = 'none';
});





function toggleUserModal() {
    getuserimage()
    var modal = document.getElementById("userModal");
    closeAllModalsExcept("userModal");
    modal.style.display = "block";
}

function closeAllModalsExcept(modalId) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        if (modal.id !== modalId) {
            modal.style.display = 'none';
        }
    });
    getuserimage()
}



function closeUserModal() {
    var modal = document.getElementById("userModal");
    modal.style.display = "none";
}

// Gestionnaires d'événements pour le survol de souris


document.getElementById("userModal").parentNode.addEventListener("mouseover", toggleUserModal);
document.getElementById("userModal").parentNode.addEventListener("mouseout", closeUserModal);


// Fonction pour remplir le tableau de notifications



function toggleNotifications2() {
    var toggle = document.querySelector('.toggle-input');
    if (toggle.checked) {
        // Activer les notifications
        // Ajoutez votre logique pour activer les notifications ici
        console.log("Notifications activées");
    } else {
        // Désactiver les notifications
        // Ajoutez votre logique pour désactiver les notifications ici
        console.log("Notifications désactivées");
    }
}
function markActive(element) {
    // Supprimer la classe "active" de tous les éléments du menu
    var menuItems = document.getElementsByClassName('menu-item');
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');
    }

    // Ajouter la classe "active" à l'élément cliqué
    element.classList.add('active');
}

// Fonction appelée lorsque vous cliquez sur le bouton "Save"
// Fonction appelée lorsque vous cliquez sur le bouton "Save"
function saveChanges(popupId) {
    var firstNameInput = document.getElementById('first-name').value;
    if (validateFirstName(firstNameInput)) {

        displayValidationMessage(true);
        closeModal(popupId);
    } else {

        displayValidationMessage(false);

        toggleErrorIcon(true);
    }
}


// Fonction pour valider le prénom
function validateFirstName(firstName) {
    // Expression régulière pour vérifier si le prénom contient uniquement des lettres
    var lettersOnly = /^[A-Za-z]+$/;
    // Vérifie si le prénom ne dépasse pas 45 caractères et contient uniquement des lettres
    return firstName.length <= 45 && lettersOnly.test(firstName);
}
function displayValidationMessage(isValid, popupId) {
    var validationMessage = document.getElementById('validation-popup2');
    if (isValid) {
        validationMessage.textContent = "First name changed";
    } else {
        validationMessage.textContent = "Invalid first name";
        validationMessage.style.backgroundColor = "white"; // Modifier la couleur de fond
        validationMessage.style.color = "red"; // Texte en blanc

    }
    // Afficher le message de validation
    validationMessage.style.display = 'block';
    // Masquer le message de validation après quelques secondes
    setTimeout(function() {
        validationMessage.style.display = 'none';
    }, 3000); // 3 secondes
}
function cancelModal() {
    closeModal(); // Ferme la modal
}


// Attend que le DOM soit complètement chargé
function activateInput() {
    var inputField = document.querySelector('.input-message');
    inputField.disabled = false; // Activer le champ d'entrée
    inputField.focus(); // Donner le focus au champ d'entrée
}

document.addEventListener('DOMContentLoaded', function () {
    var firstNameInput = document.getElementById('first-name').value;
    if (validateFirstName(firstNameInput)) {
        validationMessage.textContent = "First name changed";

    } else {
        validationMessage.textContent = "Invalid first name";
        validationMessage.style.backgroundColor = "white"; // Modifier la couleur de fond
        validationMessage.style.color = "red"; // Texte en blanc

    }
    // Afficher le message de validation
    validationMessage.style.display = 'block';
    // Masquer le message de validation après quelques secondes
    setTimeout(function() {
        validationMessage.style.display = 'none';
    }, 3000); // 3 secondes
    firstNameInput.focus();
});

// Fonction pour ouvrir le popup
function openPopup() {
    var popup = document.getElementById('popup');
    popup.classList.add('active'); // Ajoute la classe "active" pour rendre le popup visible
}

// Fonction pour fermer le popup
function closeModal() {
    var popup = document.getElementById('popup');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}


// Fonction pour afficher ou masquer l'icône d'erreur
function toggleErrorIcon(isValid) {
    var errorIcon = document.getElementById('error-icon');
    errorIcon.style.visibility = isValid ? 'hidden' : 'visible';
}
// Fonction appelée lorsque vous cliquez sur le bouton "Save"
function saveChanges2() {
    var lastNameInput = document.getElementById('last-name').value;
    var isValid = validateLastName(lastNameInput);
    var validationMessage = document.getElementById('validation-popup');

    if (isValid) {

        displayValidationMessage2(true);
    } else {
        displayValidationMessage2(false);
    }
}

// Fonction pour valider le nom de famille
function validateLastName(lastName) {
    var lettersOnly = /^[A-Za-z]+$/;
    return lastName.length <= 45 && lettersOnly.test(lastName);
}

// Fonction pour afficher le message de validation ou d'erreur
function displayValidationMessage2(isValid) {
    var validationMessage = document.getElementById('validation-popup');
    if (isValid) {
        validationMessage.textContent = "Last name changed";
    } else {
        validationMessage.textContent = "Invalid last name";
        validationMessage.style.backgroundColor = "white"; // Modifier la couleur de fond
        validationMessage.style.color = "red"; // Texte en blanc
    }
    // Afficher le message de validation
    validationMessage.style.display = 'block';
    // Masquer le message de validation après quelques secondes
    setTimeout(function() {
        validationMessage.style.display = 'none';
    }, 3000); // 3 secondes
}

// Fonction pour ouvrir le popup correspondant
function openPopup2() {
    var popup = document.getElementById('popup2');
    popup.classList.add('active');
}


// Fonction pour fermer le popup
// Fonction pour ouvrir le popup
function openPopup3() {
    var popup = document.getElementById('popup3');
    popup.classList.add('active'); // Ajoute la classe "active" pour rendre le popup visible
}

// Fonction pour fermer le popup
function closeModal3() {
    var popup = document.getElementById('popup3');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}


// Fonction pour générer un code aléatoire à 4 chiffres
function generateConfirmationCode() {
    return Math.floor(1000 + Math.random() * 9000); // Génère un nombre aléatoire entre 1000 et 9999
}
// Importer le module SendGrid
const sgMail = require('@sendgrid/mail');

// Définir la clé API SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Fonction pour envoyer l'email de confirmation
function sendConfirmationEmail(email, confirmationCode) {
    //implemanter par API backend
}


// Fonction pour vérifier le code de confirmation
function verifyConfirmationCode() {
    var inputCode = document.getElementById('confirmation-code').value; // Récupère le code saisi par l'utilisateur

    var data = {
        edit:'confirmation',
        code: inputCode,

    };
    checkcode(data);
}



 function checkOldPassword() {
    var oldPasswordInput = document.getElementById('old-password');

    var oldPassword = oldPasswordInput.value.trim();

    var data = {
        edit:'oldpassword',
        oldpassword: oldPassword,
    };

     checkpassword(data);
}
function sendcodebackend(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/settings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify( data)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
             alert(data.message)
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}

function sendcode() {
    var code = document.getElementById('confirmation-codeC');
    var data = {
        edit:'codeemail',
        code: code.value,
    };

    sendcodebackend(data);



}
function saveNewPassword() {


    var newPasswordInput = document.getElementById('new-password').value;
    var confirmpasswordInput = document.getElementById('confirm-password').value;
    var popupMessage = document.getElementById('popup-message');

    if (confirmpasswordInput==newPasswordInput)
    {


        var data = {
            edit:'changepassword',
            newpassword: newPasswordInput,

        };
        sendselldata(data)


        popupMessage.textContent = 'Old password is incorrect.';
        popupMessage.style.display = 'block';
    }else
    {
        popupMessage.textContent = 'the password dont match';
        popupMessage.style.display = 'block';

    }


}


// Fonction pour ouvrir le popup de modification du mot de passe
function openPopup4() {
    var popup = document.getElementById('popup4');
    popup.classList.add('active');
}

// Fonction pour fermer le popup de modification du mot de passe
function closeModal4() {
    var popup = document.getElementById('popup4');
    popup.classList.remove('active');
}

// Fonction pour ouvrir le popup de saisie du code de confirmation
function openPopup5() {
    var popup = document.getElementById('popup5');
    popup.classList.add('active');
}

// Fonction pour fermer le popup de saisie du code de confirmation
function closeModal5() {
    var popup = document.getElementById('popup5');
    popup.classList.remove('active');
}

// Fonction pour ouvrir le popup de saisie du nouveau mot de passe
function openPopup6() {
    var popup = document.getElementById('popup6');
    popup.classList.add('active');
}

// Fonction pour fermer le popup de saisie du nouveau mot de passe
function closeModal6() {
    var popup = document.getElementById('popup6');
    popup.classList.remove('active');
}
function openPopup10(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

// JavaScript pour fermer un popup
function closePopup10(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Fonction pour sauvegarder les changements
function saveChanges3(popupId) {


    document.getElementById("popup3").style.display = 'none';
    document.getElementById("confirmation-popup").style.display = 'block';






}// Fonction pour sauvegarder les changements







function cancelModal2() {
    var popup = document.getElementById('popup2');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}






function toggleAccountStatus() {
    var toggleInput = document.querySelector('.toggle-input');
    var accountStatus = document.querySelector('.account-status');
    var disableButton = document.querySelector('.disable-button');

    if (toggleInput.checked) {
        // Si le commutateur est activé (coché)
        accountStatus.textContent = 'Enabled';
        accountStatus.style.color = 'green';
        disableButton.textContent = 'Disable';
    } else {
        // Si le commutateur est désactivé (non coché)
        accountStatus.textContent = 'Disabled';
        accountStatus.style.color = 'red';
        disableButton.textContent = 'Enable';
    }
}
// Ajouter un gestionnaire d'événement pour le changement d'état du commutateur
document.querySelector('.toggle-input').addEventListener('change', toggleAccountStatus);



// Variable pour suivre l'état d'affichage des cartes
var isCardContainerVisible = false;

async function showCards() {
    await recivevisacars()

    var cardContainer = document.getElementById('cardContainer');

    if (isCardContainerVisible) {
        // Masquer le conteneur de cartes s'il est déjà visible
        cardContainer.innerHTML = ''; // Vide le conteneur de cartes
        cardContainer.style.display = 'none'; // Cache le conteneur de cartes
        isCardContainerVisible = false; // Met à jour l'état d'affichage des cartes
    } else {
        // Afficher le conteneur de cartes s'il est masqué
        cardContainer.innerHTML = ''; // Vide le conteneur de cartes pour éviter les doublons


        let i =1
        visacards.forEach(function (card) {
            // Création de l'élément de carte
            var cardElement = document.createElement('div');
            cardElement.classList.add('card');
// Création de l'élément pour afficher le titre de la carte
            var titleElement = document.createElement('h2');
            titleElement.textContent = card.title; // Définition du texte avec le titre de la carte
            titleElement.style.color = 'skyblue'; // Modification de la couleur du texte en bleu ciel
            titleElement.style.fontFamily = 'Arial, sans-serif'; // Modification de la police de caractères
            titleElement.style.fontSize = '13px'; // Modification de la taille de la police
            titleElement.style.fontStyle = 'italic'; // Ajout du style italic


            cardElement.appendChild(titleElement); // Ajout de l'élément du titre à l'élément de carte

            // Extraction des 4 derniers chiffres du numéro de carte
            var lastFourDigits = card.number.substring(card.number.length - 4);

            /// Création de l'élément pour afficher les 4 derniers chiffres du numéro de carte
            var numberElement = document.createElement('p');
            numberElement.textContent = '**** **** **** ' + lastFourDigits; // Affichage des 4 derniers chiffres
            numberElement.style.color = 'white'; // Couleur du texte en blanc
            cardElement.appendChild(numberElement); // Ajout de l'élément du numéro à l'élément de carte

            // Création de l'élément du bouton de suppression
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button')
            deleteButton.style.color = 'black';
            deleteButton.addEventListener('click', function () {

                cardElement.remove();
                var data ={
                    numbercard:card.number,
                    edit:'deletcard'
                }
                sendselldata(data)
                cardData = visacards.filter(function (item) {
                    return item.number !== card.number;
                });
            });

            // Ajout du bouton de suppression à l'élément de carte
            cardElement.appendChild(deleteButton);

            // Création de l'élément pour l'icône de la carte
            var iconElement = document.createElement('img');
            iconElement.src = 'images/visa.png'; // Chemin vers l'icône
            iconElement.classList.add('card-icon'); // Ajout de la classe 'card-icon' à l'icône
            cardElement.appendChild(iconElement); // Ajout de l'icône à l'élément de carte

            // Ajout de l'élément de carte au conteneur des cartes
            cardContainer.appendChild(cardElement);
        });


        var saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.color = 'black';
        saveButton.id = 'saveButton';
        saveButton.style.marginTop = '-7px';
        saveButton.addEventListener('click', function () {
            // Sauvegarde des cartes restantes dans votre système de stockage
            saveCards(getRemainingCards(cardContainer));
        });
        cardContainer.appendChild(saveButton); // Ajout du bouton Save au conteneur des cartes

        cardContainer.style.display = 'block'; // Affich le conteneur de cartes
        isCardContainerVisible = true; // Met à jour l'état d'affichage des cartes
    }
}

// Fonction pour créer un élément de carte
function createCardElement(card, container) {
    // Création de l'élément de carte
    var cardElement = document.createElement('div');
    cardElement.classList.add('card'); // Ajout de la classe 'card' à l'élément de carte
// Création de l'élément pour afficher le titre de la carte
    var titleElement = document.createElement('h2');
    titleElement.textContent = card.title; // Définition du texte avec le titre de la carte
    titleElement.style.color = '#001f3f'; // Modification de la couleur du texte en bleu nuit
    titleElement.style.fontFamily = 'Arial, sans-serif'; // Modification de la police de caractères
    titleElement.style.fontSize = '13px'; // Modification de la taille de la police
    titleElement.style.fontStyle = 'italic'; // Ajout du style italic

    cardElement.appendChild(titleElement);


    var lastFourDigits = card.number.substring(card.number.length - 4);

    // Création de l'élément pour afficher les 4 derniers chiffres du numéro de carte
    var numberElement = document.createElement('p');
    numberElement.textContent = '**** **** **** ' + lastFourDigits; // Affichage des 4 derniers chiffres
    cardElement.appendChild(numberElement); // Ajout de l'élément du numéro à l'élément de carte

    // Création de l'élément du bouton de suppression
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.style.color = 'red';
    deleteButton.id='deleteButton1'
    deleteButton.addEventListener('click', function () {

        cardElement.remove();
    });

    // Ajout du bouton de suppression à l'élément de carte
    cardElement.appendChild(deleteButton);

    // Création de l'élément pour l'icône de la carte
    var iconElement = document.createElement('img');
    iconElement.src = 'images/visa.png'; // Chemin vers l'icône
    iconElement.classList.add('card-icon'); // Ajout de la classe 'card-icon' à l'icône
    cardElement.appendChild(iconElement); // Ajout de l'icône à l'élément de carte

    // Ajout de l'élément de carte au conteneur des cartes
    container.appendChild(cardElement);
}

// Fonction pour récupérer les cartes sauvegardées
function getSavedCards() {
    // Récupérer les cartes sauvegardées depuis le stockage local
    var savedCardsJson = localStorage.getItem('savedCards');
    return savedCardsJson ? JSON.parse(savedCardsJson) : [];
}

// Fonction pour sauvegarder les cartes
function saveCards(cards) {
    // Sauvegarder les cartes dans le stockage local
    localStorage.setItem('savedCards', JSON.stringify(cards));
}

// Fonction pour récupérer les cartes restantes dans le conteneur
function getRemainingCards(container) {
    // Récupérer les cartes restantes dans le conteneur
    var cardElements = container.querySelectorAll('.card');
    var remainingCards = [];
    cardElements.forEach(function (cardElement) {
        var titleElement = cardElement.querySelector('h2');
        var numberElement = cardElement.querySelector('p');
        var title = titleElement.textContent;
        var number = numberElement.textContent.replace(/\D/g, ''); // Enlever les caractères non numériques
        remainingCards.push({title: title, number: number});
    });
    return remainingCards;
}

// Appel de la fonction showCards pour afficher les cartes
showCards();


// Fonction pour démarrer l'animation
function startAnimation() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.classList.remove('paused'); // Supprimer la classe 'paused' pour démarrer l'animation
    });
}

// Fonction pour arrêter l'animation
function stopAnimation() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.classList.add('paused'); // Ajouter la classe 'paused' pour arrêter l'animation
    });
}


function adjustPageHeight() {
    var windowHeight = window.innerHeight;
    document.body.style.height = windowHeight + 'px';
}

// Appel de la fonction pour ajuster la hauteur de la page lors du chargement initial de la page
adjustPageHeight();

// Écouteur d'événement pour ajuster la hauteur de la page lorsque la fenêtre est redimensionnée
window.addEventListener('resize', adjustPageHeight);

