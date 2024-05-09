










let transction=[]
let assists=[]
let userinfo

var Field1 = document.getElementById('destWalletId');
var Field2 = document.getElementById('amount');
var select1 = document.getElementById('currency');
var send = document.getElementById('send');
send.addEventListener('click', function() {
    var data = {
        field1: Field1.value,
        field2: Field2.value,
        select: select1.value,
    };
   alert(5)
    sendDataTobackend(data);

});


function sendDataTobackend(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/walletpage/', {
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

        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}




async function recivetransction() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendtransction/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ data: 'all'})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        transction=JSON.stringify(data.transactions)
        transction = JSON.parse(transction)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
async function reciveassists() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendassists/', {
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
        assists=JSON.stringify(data.assets)
        assists = JSON.parse(assists)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

async function reciveuserinfo() {

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



    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
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
    modals.forEach(function(modal) {
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
    notifications.forEach(function(notification) {
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


document.addEventListener('DOMContentLoaded', function() {
    // Récupère tous les liens de la barre de navigation
    const navbarLinks = document.querySelectorAll('#navbar a');
    // Fonction pour déplacer la page jusqu'à la section correspondante
    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Récupère l'ID de la section cible
        const targetSection = document.getElementById(targetId); // Sélectionne la section cible
        const offset = targetSection.offsetTop; // Récupère la position verticale de la section par rapport au haut de la page
        window.scrollTo({
            top: offset,
            behavior: 'smooth' // Défilement vers la section
        });
    }

    // Ajoute un gestionnaire d'événements de clic à chaque lien de la barre de navigation
    navbarLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
});





document.addEventListener('DOMContentLoaded',   async function() {
    await reciveassists()

    // Données d'actifs (juste un exemple)
    const assets = [
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
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

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Clear the content of the asset table
        assetTable.innerHTML = '';
            assists.slice(startIndex, endIndex).forEach((asset) => {

                const row = document.createElement('tr');

                // Coin cell
                const coinCell = document.createElement('td');
                const coinSpan = document.createElement('span');
                const coinImage = document.createElement('img');
                coinImage.src = asset.image || 'default_icon.png';
                coinImage.alt = asset.coin;
                coinImage.width = 20;
                const coinText = document.createTextNode(asset.coin);
                coinSpan.style.display = 'inline-block';
                coinSpan.appendChild(coinImage);
                coinSpan.appendChild(document.createTextNode(' '));
                coinSpan.appendChild(coinText);
                coinCell.appendChild(coinSpan);
                row.appendChild(coinCell);

                // Amount cell
                const amountCell = document.createElement('td');
                amountCell.textContent = asset.amount;
                row.appendChild(amountCell);

                // Price cell
                const priceCell = document.createElement('td');
                priceCell.textContent = asset.price;
                row.appendChild(priceCell);

                assetTable.appendChild(row);
            });

        // Show/hide buttons based on data length and current page
        showMoreButton.style.display = endIndex < assists.length ? 'block' : 'none';
        previousButton.style.display = page > 1 ? 'block' : 'none';

        // Display message if no records
        const noRecordsAssets = document.getElementById('noRecordsAssets');
        noRecordsAssets.style.display = assists.length === 0 ? 'block' : 'none';
    }


    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Show more"
    showMoreButton.addEventListener('click', function() {
        currentPage++;
        displayAssets(currentPage);
    });

    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Previous"
    previousButton.addEventListener('click', function() {
        currentPage--;
        displayAssets(currentPage);
    });

    // Afficher les actifs sur la première page lors du chargement de la page
    displayAssets(currentPage);


});







// Exemple (Données des transactions récentes)
const recentTransactionsExample = [
    { date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD' },

];

// Variables globales
const transactionList = document.getElementById('transaction-list');
const transactionsPerPage = 5;
let currentPage = 1;

// Fonction pour afficher les transactions sur une page
async function displayTransactions(page) {
    await recivetransction()
    const startIndex = (page - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    transactionList.innerHTML = '';

    if (transction.length === 0) {
        document.getElementById('noRecordsTransactions').style.display = 'block'; // Afficher le message "No records"
        document.getElementById('previous-transactions').style.display = 'none'; // Masquer le bouton "Previous"
        document.getElementById('next-transactions').style.display = 'none'; // Masquer le bouton "Next"
        return; // Sortir de la fonction si la liste est vide
    } else {
        document.getElementById('noRecordsTransactions').style.display = 'none'; // Masquer le message "No records"
        document.getElementById('previous-transactions').style.display = 'block'; // Afficher le bouton "Previous"
        document.getElementById('next-transactions').style.display = 'block'; // Afficher le bouton "Next"
    }

    transction.slice(startIndex, endIndex).forEach((transaction, index) => {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function(event) {
            event.stopPropagation(); // Empêche l'événement de se propager au `li`
            showModal(transaction, index + startIndex);
        };

        const textContent = document.createElement('span');
        textContent.textContent = `${transaction.date} - ${transaction.type}: ${transaction.amount} ${transaction.currency}`;

        listItem.appendChild(deleteButton);
        listItem.appendChild(textContent);

        listItem.addEventListener('dblclick', function() {
            showModal(transaction, index + startIndex);
        });

        transactionList.appendChild(listItem);
    });

    updatePaginationButtons();
}


// Fonction pour mettre à jour l'affichage des boutons de pagination
async function updatePaginationButtons() {
    await recivetransction()
    const totalTransactions = transction.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const previousButton = document.getElementById('previous-transactions');
    const nextButton = document.getElementById('next-transactions');
    previousButton.style.display = currentPage > 1 ? 'block' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'block' : 'none';
}

// Gestionnaire d'événements pour le clic sur les boutons "Next" et "Previous"
document.getElementById('next-transactions').addEventListener('click', function() {
    currentPage++;
    displayTransactions(currentPage);
});
document.getElementById('previous-transactions').addEventListener('click', function() {
    currentPage--;
    displayTransactions(currentPage);
});

// Gestionnaire pour le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    displayTransactions(currentPage);
});

// Fonctions pour la modal de suppression
function showModal(transaction, index) {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'block';

    document.getElementById('confirmDelete').onclick = function() {
        deleteTransaction(index);
        modal.style.display = 'none';
    };

    document.getElementById('cancelDelete').onclick = function() {
        modal.style.display = 'none';
    };


}

function deleteTransaction(index) {
    recentTransactionsExample.splice(index, 1);
    displayTransactions(currentPage);
    updatePaginationButtons(); // Mise à jour de la pagination si nécessaire
}




// Informations de l'utilisateur (exemple)


// Fonction pour mettre à jour les informations de l'utilisateur
async function updateUserDetails() {
    await reciveuserinfo()
    alert(userinfo)
    document.getElementById('user-id').textContent = userinfo.id;
    document.getElementById('user-first-name').textContent = userinfo.firstName;
    document.getElementById('user-last-name').textContent = userinfo.lastName;
    document.getElementById('user-email').textContent = userinfo.email;
    document.getElementById('user-dob').textContent = userinfo.dob;
}


updateUserDetails();


function updateCryptoValue() {
    const cryptoSelect = document.getElementById('crypto-select');
    const selectedCrypto = cryptoSelect.value;
    const balanceCryptoValueSpan = document.getElementById('balance-crypto-value');

    // Ici mettre en place la logique pour récupérer la valeur de la crypto-monnaie
    // Par exemple
    const cryptoValues = {
        'BTC': '0.0123 ',
        'USD': '1000 ',
        'ETH': '0.4567 ',
        'BNB': '2 '
    };

    balanceCryptoValueSpan.textContent = cryptoValues[selectedCrypto];
}

// Appeler la fonction une fois au chargement de la page pour afficher la valeur initiale
updateCryptoValue();














// Fonction pour afficher ou masquer le modal de transfert
function toggleTransferModal() {
    var modal = document.getElementById('transferModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

document.querySelector('.balance-buttons button:nth-child(3)').addEventListener('click', toggleTransferModal);

// Liste des devises avec leur nom, valeur et montant maximal autorisé
const currencies = [
    { name: "BTC", value: "BTC", maxAmount: 10 },
    { name: "ETH", value: "ETH", maxAmount: 20 },
    { name: "BNB", value: "BNB", maxAmount: 30 }
];
// Sélectionner l'élément select pour la devise
const currencySelect = document.getElementById('currency');
// Générer les options de la liste déroulante
currencies.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency.value;
    option.textContent = currency.name;
    currencySelect.appendChild(option);
});
// Obtenir la valeur maximale autorisée pour la devise sélectionnée
currencySelect.addEventListener('change', function() {
    const selectedCurrency = currencies.find(currency => currency.value === this.value);
    document.getElementById('amount').setAttribute('max', selectedCurrency.maxAmount);
});
// Valider et soumettre le formulaire de transfert
document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var destWalletId = document.getElementById('destWalletId').value;
    var amount = document.getElementById('amount').value;
    if (amount <= 0 || destWalletId.trim() === '') {
        alert('Please enter valid destination and amount');
    } else {
        alert('Transfer successful to ' + destWalletId + ' for ' + amount + ' ' + document.getElementById('currency').value);
        toggleTransferModal();
    }
});

