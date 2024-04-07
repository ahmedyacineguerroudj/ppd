function closeAllModalsExcept(modalId) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (modal.id !== modalId) {
            modal.style.display = 'none';
        }
    });
}

function toggleNotificationModal() {
    var modal = document.getElementById("notificationModal");
    closeAllModalsExcept("notificationModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleUserModal() {
    var modal = document.getElementById("userModal");
    closeAllModalsExcept("userModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}




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
    // Données d'actifs (juste un  exemple)
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
            coinImage.src = asset.image || 'default_icon.png';
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
    { date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR' },
    { date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC' },
    { date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD' },
    { date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR' },
    { date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC' },
    { date: '2024-04-01', type: 'Deposit', amount: 100, currency: 'USD' },
    { date: '2024-03-30', type: 'Withdrawal', amount: 50, currency: 'EUR' },
    { date: '2024-03-28', type: 'Transfer', amount: 200, currency: 'BTC' },
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
document.getElementById('next-transactions').addEventListener('click', function() {
    currentPage++;
    displayTransactions(currentPage);
});
// Gestionnaire d'événements pour le clic sur le bouton "Previous"
document.getElementById('previous-transactions').addEventListener('click', function() {
    currentPage--;
    displayTransactions(currentPage);
});
// Variables globales
const transactionList = document.getElementById('transaction-list');
const transactionsPerPage = 5;
let currentPage = 1;
document.addEventListener('DOMContentLoaded', function() {
    // Afficher les transactions sur la première page lors du chargement de la page
    displayTransactions(currentPage);
});


