//
//
// Vous pouvez également utiliser JavaScript pour masquer le spinner une fois que la page est entièrement chargée
window.addEventListener('load', function () {
    var spinner = document.querySelector('.loading-overlay');
    spinner.style.display = 'none';
});


function toggleNotificationModal() {
    var modal = document.getElementById("notificationModal");
    closeAllModalsExcept("notificationModal");
    modal.style.display = "block";
}

function toggleUserModal() {
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
}

function closeNotificationModal() {
    var modal = document.getElementById("notificationModal");
    modal.style.display = "none";
}

function closeUserModal() {
    var modal = document.getElementById("userModal");
    modal.style.display = "none";
}

// Gestionnaires d'événements pour le survol de souris
document.getElementById("notificationModal").parentNode.addEventListener("mouseover", toggleNotificationModal);
document.getElementById("notificationModal").parentNode.addEventListener("mouseout", closeNotificationModal);

document.getElementById("userModal").parentNode.addEventListener("mouseover", toggleUserModal);
document.getElementById("userModal").parentNode.addEventListener("mouseout", closeUserModal);


// Fonction pour remplir le tableau de notifications
function fillNotificationTable(notifications) {
    const tableBody = document.querySelector('#notificationTable tbody');
    tableBody.innerHTML = '';
    // Parcourir les notifications et ajouter chaque entrée au tableau
    notifications.forEach(function (notification) {
        var row = '<tr>';
        row += '<td>' + notification.date + '</td>';
        row += '<td>' + notification.message + '</td>';
        row += '</tr>';
        tableBody.innerHTML += row;
    });
}

// Exemple
const notificationsData = [
    {date: '2024-04-07', message: 'Notification 1 '},
    {date: '2024-04-06', message: 'Notification 2'},
    {date: '2024-04-05', message: 'Notification 3'},
    {date: '2024-04-07', message: 'Notification 1 '},
    {date: '2024-04-06', message: 'Notification 2'},
    {date: '2024-04-05', message: 'Notification 3'},
    {date: '2024-04-07', message: 'Notification 1 '},
    {date: '2024-04-06', message: 'Notification 2'},
    {date: '2024-04-05', message: 'Notification 3'},
    {date: '2024-04-07', message: 'Notification 1 '},
    {date: '2024-04-06', message: 'Notification 2'},
    {date: '2024-04-05', message: 'Notification 3'},
];

// Remplir le tableau avec les données de notification
fillNotificationTable(notificationsData);


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
        // Le prénom est valide, afficher le message flottant et fermer le popup
        displayValidationMessage(true);
        closeModal(popupId);
    } else {
        // Le prénom est invalide, afficher le message d'erreur
        displayValidationMessage(false);
        // Afficher l'icône d'erreur
        // Afficher l'icône d'erreur
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
    setTimeout(function () {
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
    setTimeout(function () {
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
    setTimeout(function () {
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
    var confirmationCode = generateConfirmationCode(); // Génère le même code de confirmation que celui envoyé (pour la démonstration)

    // Vérifie si le code saisi correspond au code de confirmation
    if (inputCode === confirmationCode.toString()) {
        // Si le code est correct, ouvrir le popup6 pour que l'utilisateur puisse saisir le nouveau mot de passe
        closeModal5(); // Ferme le popup5
        openPopup6(); // Ouvre le popup6
    } else {
        // Si le code est incorrect, afficher un message d'erreur
        var popupMessage = document.getElementById('popup-message-confirmation');
        popupMessage.textContent = 'Incorrect confirmation code !';
        popupMessage.style.display = 'block';
    }
}


function checkOldPassword() {
    var oldPasswordInput = document.getElementById('old-password');
    var oldPassword = oldPasswordInput.value.trim();

    // Vérifiez ici si l'ancien mot de passe est correct
    if (oldPassword === 'ino') { // Remplacez 'motdepassecorrect' par le mot de passe correct
        // Si l'ancien mot de passe est correct, débloquez le bouton "Next" et affichez le popup suivant
        var nextButton = document.getElementById('next-button');
        nextButton.removeAttribute('disabled');

        // Masquer le popup actuel (popup4) et afficher le popup suivant (par exemple, popup5)
        var currentPopup = document.getElementById('popup4');
        currentPopup.classList.remove('active');

        var nextPopup = document.getElementById('popup5');
        nextPopup.classList.add('active');
    } else {
        // Si l'ancien mot de passe n'est pas correct, affichez un message d'erreur
        var popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = 'Old password is incorrect.';
        popupMessage.style.display = 'block';
    }
}


function saveNewPassword() {
    // Récupérez le nouveau mot de passe et effectuez des vérifications si nécessaire
    var newPasswordInput = document.getElementById('new-password');
    var newPassword = newPasswordInput.value.trim();

    // Vous pouvez ajouter ici des vérifications supplémentaires sur le nouveau mot de passe

    // Enregistrez le nouveau mot de passe si toutes les vérifications sont réussies
    // Exemple de sauvegarde du nouveau mot de passe
    var popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = 'Old password is incorrect.';
    popupMessage.style.display = 'block';
    console.log('New password saved successfully:', newPassword);
}


// Fonction pour ouvrir le popup de modification du mot de passe
function openPopup4() {
    var popup = document.getElementById('popup4');
    popup.classList.add('active');
}

// Fonction pour ouvrir le popup de modification du mot de passe
function openPopup44() {
    var popup = document.getElementById('popup44');
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


// Fonction pour sauvegarder les changements
function saveChanges3(popupId) {
    // Récupérer la valeur du last name depuis l'input
    var emailInput = document.getElementById('emaile');
    var lastNameValue = emailInput.value.trim();
    // Vous pouvez ajouter des vérifications ou des traitements supplémentaires ici

    // Fermer le popup
    closeModal3();
}// Fonction pour sauvegarder les changements


function cancelModal2() {
    var popup = document.getElementById('popup2');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}


// Sélection de l'élément input de type fichier
var fileInput = document.getElementById('file');

// Écouteur d'événement pour détecter les changements dans le fichier sélectionné
fileInput.addEventListener('change', function (event) {   //amelirer par backend//
    // Sélection de l'élément img où la nouvelle photo sera affichée
    var photoElement = document.getElementById('photo');

    // Vérification s'il y a des fichiers sélectionnés
    if (event.target.files.length > 0) {
        // Sélection du premier fichier (en supposant qu'un seul fichier est sélectionné)
        var newPhoto = event.target.files[0];

        // Création d'un objet URL à partir du fichier sélectionné
        var newPhotoURL = URL.createObjectURL(newPhoto);

        photoElement.src = newPhotoURL;
    }
});


// fonction pour activr et desactiver le compte //

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

function showCards() {
    var cardContainer = document.getElementById('cardContainer');

    if (isCardContainerVisible) {
        // Masquer le conteneur de cartes s'il est déjà visible
        cardContainer.innerHTML = ''; // Vide le conteneur de cartes
        cardContainer.style.display = 'none'; // Cache le conteneur de cartes
        isCardContainerVisible = false; // Met à jour l'état d'affichage des cartes
    } else {
        // Afficher le conteneur de cartes s'il est masqué
        cardContainer.innerHTML = ''; // Vide le conteneur de cartes pour éviter les doublons

        var cardData = [
            {title: 'credit carde', number: '1234567890123456'},
            {title: 'credit carde', number: '2345678901234567'},
            {title: 'credit carde', number: '3456789012345678'}
            // Ajoutez autant d'objets que nécessaire avec les données de chaque carte
        ];

        // Parcours des données de chaque carte
        cardData.forEach(function (card) {
            // Création de l'élément de carte
            var cardElement = document.createElement('div');
            cardElement.classList.add('card'); // Ajout de la classe 'card' à l'élément de carte
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
            deleteButton.textContent = 'Delete'; // Texte du bouton
            deleteButton.classList.add('delete-button'); // Ajout de la classe pour le style CSS
            deleteButton.style.color = 'black'; // Couleur du texte en rouge
            deleteButton.addEventListener('click', function () {
                // Supprimer la carte correspondante de l'interface utilisateur
                cardElement.remove();
                // Supprimer la carte correspondante des données
                cardData = cardData.filter(function (item) {
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

        // Création du bouton Save
        var saveButton = document.createElement('button');
        saveButton.textContent = 'Save'; // Texte du bouton
        saveButton.style.color = 'black'; // Couleur du texte en rouge
        saveButton.id = 'saveButton'; // ID du bouton pour la gestion des événements
        saveButton.style.marginTop = '-7px'; // Marge supérieure pour l'espacement
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

    cardElement.appendChild(titleElement); // Ajout de l'élément du titre à l'élément de carte

    // Extraction des 4 derniers chiffres du numéro de carte
    var lastFourDigits = card.number.substring(card.number.length - 4);

    // Création de l'élément pour afficher les 4 derniers chiffres du numéro de carte
    var numberElement = document.createElement('p');
    numberElement.textContent = '**** **** **** ' + lastFourDigits; // Affichage des 4 derniers chiffres
    cardElement.appendChild(numberElement); // Ajout de l'élément du numéro à l'élément de carte

    // Création de l'élément du bouton de suppression
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // Texte du bouton
    deleteButton.classList.add('delete-button'); // Ajout de la classe pour le style CSS
    deleteButton.style.color = 'red'; // Couleur du texte en rouge
    deleteButton.addEventListener('click', function () {
        // Supprimer la carte correspondante de l'interface utilisateur
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


// JavaScript pour ouvrir un popup
function openPopup10(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

// JavaScript pour fermer un popup
function closePopup10(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Ajoutez ici d'autres fonctions JavaScript pour gérer les autres popups et les interactions.
// Fonction pour vérifier si l'email entré correspond à l'email existant
// Fonction pour vérifier si l'email entré correspond à l'email existant
// Fonction pour vérifier si l'email entré correspond à l'email existant
function checkOldEmail() {
    var oldEmail = document.getElementById('old-email').value;
    // Ici, vous devriez vérifier si l'email entré correspond à l'email existant
    // Je vais simuler une vérification en comparant simplement avec une valeur statique
    var existingEmail = "utilisateur@example.com"; // Remplacez ceci par l'email existant
    if (oldEmail === existingEmail) {
        // L'email est correct, fermer le popup précédent
        closePopup10('edit-email-popup');
        // Afficher le modèle de confirmation de code
        openPopup10('confirmation-popup');
        // Générez et envoyez le code de confirmation par e-mail à l'utilisateur
        // Vous pouvez appeler ici une fonction pour générer et envoyer le code par e-mail
        sendConfirmationCodeByEmail(existingEmail);
    } else {
        // L'email est incorrect, afficher un message d'erreur par exemple
        document.getElementById('edit-email-popup-message').innerText = "Invalid email. Please enter the correct email.";
    }
}
// Fonction pour générer et envoyer le code de confirmation par e-mail
function sendConfirmationCodeByEmail(email) {
    // Ici, vous pouvez implémenter la logique pour générer et envoyer le code de confirmation par e-mail
    // Par exemple, vous pouvez utiliser une API pour envoyer des e-mails
    // Je vais simuler l'envoi du code de confirmation ici
    var confirmationCode = generateConfirmationCode();
    // Vous pouvez remplacer cette console.log par une requête HTTP à un serveur pour envoyer l'e-mail
    console.log("Confirmation code sent to " + email + ": " + confirmationCode);
}

// Fonction pour générer un code de confirmation aléatoire (simulée)
function generateConfirmationCode() {
    // Générez un code de confirmation aléatoire
    // Dans cet exemple, je vais simplement générer un nombre aléatoire à 6 chiffres
    var code = Math.floor(100000 + Math.random() * 900000);
    return code;
}
