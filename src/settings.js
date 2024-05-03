

// Vous pouvez également utiliser JavaScript pour masquer le spinner une fois que la page est entièrement chargée
window.addEventListener('load', function() {
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


document.addEventListener('DOMContentLoaded', function () {
    // Données d'actifs (juste un  exemple)
    const assets = [
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
        {coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png'},
    ];

    // Sélection de l'élément de la table des actifs
    const assetTable = document.getElementById('asset-items');

    // Sélection des boutons "Show more" et "Previous"
    const showMoreButton = document.getElementById('show-more');
    const previousButton = document.getElementById('previous');

    // Nombre d'éléments à afficher par page
    const itemsPerPage = 5;
    let currentPage = 1;

    // Fonction pour afficher les actifs sur une page donnée
    function displayAssets(page) {
        // Calcul des index de début et de fin pour les actifs à afficher sur la page actuelle
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        // Effacer le contenu de la table des actifs
        assetTable.innerHTML = '';
        // Afficher les actifs sur la page actuelle
        assets.slice(startIndex, endIndex).forEach(asset => {
            const row = document.createElement('tr');
            const coinCell = document.createElement('td');
            const coinSpan = document.createElement('span');
            const coinImage = document.createElement('img');
            coinImage.src = 'asset.image/default_icon.png';
            coinImage.alt = asset.coin;
            coinImage.width = 20; // Taille de l'image
            const coinText = document.createTextNode(asset.coin);
            coinSpan.style.display = 'inline-block';
            coinSpan.appendChild(coinImage);
            coinSpan.appendChild(document.createTextNode(' '));
            coinSpan.appendChild(coinText);
            coinCell.appendChild(coinSpan);
            row.appendChild(coinCell);
            const amountCell = document.createElement('td');
            amountCell.textContent = asset.amount;
            row.appendChild(amountCell);
            const priceCell = document.createElement('td');
            priceCell.textContent = asset.price;
            row.appendChild(priceCell);
            assetTable.appendChild(row);
        });
        // Afficher ou masquer le bouton "Show more" en fonction du nombre d'éléments restants
        showMoreButton.style.display = endIndex < assets.length ? 'block' : 'none';
        // Afficher ou masquer le bouton "Previous" en fonction de la page actuelle
        previousButton.style.display = page > 1 ? 'block' : 'none';
    }

    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Show more"
    showMoreButton.addEventListener('click', function () {
        currentPage++;
        displayAssets(currentPage);
    });
    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Previous"
    previousButton.addEventListener('click', function () {
        currentPage--;
        displayAssets(currentPage);
    });
    // Afficher les actifs sur la première page lors du chargement de la page
    displayAssets(currentPage);
});


// Exemple (Données des transactions récentes)
const recentTransactionsExample = [
    {date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD'},
    {date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR'},
    {date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC'},
    {date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD'},
    {date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR'},
    {date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC'},
    {date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD'},
    {date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR'},
    {date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC'},
];

// Fonction pour afficher les transactions sur une page
function displayTransactions(page) {
    const startIndex = (page - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    transactionList.innerHTML = '';
    recentTransactionsExample.slice(startIndex, endIndex).forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.date} - ${transaction.type}: ${transaction.amount} ${transaction.currency}`;
        transactionList.appendChild(listItem);
    });
    updatePaginationButtons();
}

// Fonction pour mettre à jour l'affichage des boutons de pagination
function updatePaginationButtons() {
    const totalTransactions = recentTransactionsExample.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const previousButton = document.getElementById('previous-transactions');
    const nextButton = document.getElementById('next-transactions');
    previousButton.style.display = currentPage > 1 ? 'block' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'block' : 'none';
}

// Gestionnaire d'événements pour le clic sur le bouton "Next"
document.getElementById('next-transactions').addEventListener('click', function () {
    currentPage++;
    displayTransactions(currentPage);
});
// Gestionnaire d'événements pour le clic sur le bouton "Previous"
document.getElementById('previous-transactions').addEventListener('click', function () {
    currentPage--;
    displayTransactions(currentPage);
});
// Variables globales
const transactionList = document.getElementById('transaction-list');
const transactionsPerPage = 5;
let currentPage = 1;
document.addEventListener('DOMContentLoaded', function () {
    // Afficher les transactions sur la première page lors du chargement de la page
    displayTransactions(currentPage);
});

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

// Fonction pour afficher le message de validation et l'icône d'erreur
function displayValidationMessage(isValid) {
    var validationMessage = document.getElementById('validation-message');
    var errorIcon = document.getElementById('error-icon');
    if (isValid) {
        validationMessage.textContent = "first-name changed";
        validationMessage.style.color = "black";
        validationMessage.style.fontWeight = "bold"; // Texte en gras
        validationMessage.style.fontStyle = "italic"; // Texte en italique
        validationMessage.style.fontSize = "smaller"; // Taille de

        // Masquer l'icône d'erreur
        errorIcon.style.visibility = 'hidden';
    } else {
        validationMessage.textContent = "invalid first_name";
        validationMessage.style.color = "red";
        validationMessage.style.fontWeight = "bold"; // Texte en gras
        validationMessage.style.fontStyle = "italic"; // Texte en italique
        validationMessage.style.fontSize = "smaller"; // Taille de
    }
    // Afficher le message flottant pendant quelques secondes (par exemple 3 secondes)
    setTimeout(function () {
        validationMessage.textContent = "";
    }, 3000);
}// Fonction pour fermer la modal et la page
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
        // Le prénom est valide
        console.log("Le prénom est valide.");
    } else {
        // Le prénom est invalide
        console.log("Le prénom est invalide.");
    }
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
function saveChanges2(popupId) {
    var lastNameInput = document.getElementById('last-name').value;
    if (validateLastName(lastNameInput)) {
        // Le nom est valide, afficher le message de validation et fermer le popup
        displayValidationMessage2(true, popupId);
        closeModal(popupId);
    } else {
        // Le nom est invalide, afficher le message d'erreur et l'icône d'erreur
        displayValidationMessage2(false, popupId);
        toggleErrorIcon(true, popupId);
    }
}

// Fonction pour valider le nom de famille
function validateLastName(lastName) {
    var lettersOnly = /^[A-Za-z]+$/;
    return lastName.length <= 45 && lettersOnly.test(lastName);
}

// Fonction pour afficher le message de validation ou d'erreur
function displayValidationMessage2(isValid, popupId) {
    var validationMessage = document.getElementById('validation-message' + popupId); // Ajout de l'ID du popup
    if (isValid) {
        validationMessage.textContent = "Last name changed";
        validationMessage.style.color = "black";
    } else {
        validationMessage.textContent = "Invalid last name";
        validationMessage.style.color = "red";
    }
    // Afficher le message flottant pendant quelques secondes (par exemple 3 secondes)
    setTimeout(function () {
        validationMessage.textContent = "";
    }, 3000);
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

// Fonction pour sauvegarder les changements
function saveChanges3(popupId) {
    // Récupérer la valeur du last name depuis l'input
    var emailInput = document.getElementById('emaile');
    var lastNameValue = emailInput.value.trim();

    // Vous pouvez ajouter des vérifications ou des traitements supplémentaires ici

    // Fermer le popup
    closeModal3();
}// Fonction pour sauvegarder les changements
function saveChanges4(popupId) {
    // Récupérer les valeurs des champs d'entrée
    var oldPasswordInput = document.getElementById('old-password');
    var newPasswordInput = document.getElementById('new-password');
    var confirmPasswordInput = document.getElementById('confirm-password');

    // Récupérer l'élément pour afficher les messages
    var messageElement = document.getElementById('validation-message');

    // Vider les messages précédents
    messageElement.textContent = '';
// Vérifier si tous les champs sont remplis
    if (oldPasswordInput.value.trim() === '' || newPasswordInput.value.trim() === '' || confirmPasswordInput.value.trim() === '') {
        messageElement.textContent = 'Please complete all fields.';
        return;
    }


    // Vérifier si les nouveaux mots de passe correspondent
    if (newPasswordInput.value.trim() !== confirmPasswordInput.value.trim()) {
        messageElement.textContent = 'New passwords do not match.';
        return;
    }

    // Vérifier si l'ancien mot de passe est correct
    var oldPassword = 'ino'; // Remplacez ceci par le vrai mot de passe dynamiquement
    if (oldPasswordInput.value.trim() !== oldPassword) {
        messageElement.textContent = 'Old password is incorrect.';
        return;
    }

    // Si toutes les vérifications sont réussies, afficher un message de réussite
    messageElement.textContent = 'Changes saved successfully.';

    // Fermer le popup après un court délai
    setTimeout(function () {
        closeModal4(popupId);
    }, 2000);
    closeModal4();
}

// Fonction pour fermer le popup
// Fonction pour ouvrir le popup
function openPopup4() {
    var popup = document.getElementById('popup4');
    popup.classList.add('active'); // Ajoute la classe "active" pour rendre le popup visible
}

// Fonction pour fermer le popup
function closeModal4() {
    var popup = document.getElementById('popup4');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}

// Fonction pour fermer le popup
function cancelModal2() {
    var popup = document.getElementById('popup2');
    popup.classList.remove('active'); // Supprime la classe "active" pour rendre le popup invisible
}

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


// Sélection de l'élément input de type fichier
var fileInput = document.getElementById('file');

// Écouteur d'événement pour détecter les changements dans le fichier sélectionné
fileInput.addEventListener('change', function(event) {   //amelirer par backend//
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
