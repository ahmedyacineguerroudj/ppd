// Récupérez les boutons "Sign up" et "Login"
var signupButton = document.querySelector(".signup-btn1");
var loginButton = document.querySelector(".login-btn1");
var notificationButton = document.querySelector(".notification-button");
var userButton = document.querySelector(".user-button");
var joinUsSection = document.querySelector(".market-JoinUs");

// Condition pour vérifier si l'utilisateur est un guest ou un user
var isGuest = true;


if (isGuest) {
    loginButton.style.display = "block";
    signupButton.style.display = "block";
    joinUsSection.style.display = "block";
    notificationButton.style.display = "none";
    userButton.style.display = "none";
} else {
    signupButton.style.display = "none";
    loginButton.style.display = "none";
    notificationButton.style.display = "block";
    userButton.style.display = "block";
    joinUsSection.style.display = "none";
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





document.addEventListener('DOMContentLoaded', function() {
    // Données pour l'exemple
    const cryptoData = [
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },
        { name: "Bitcoin", price: "$73,418.70", marketCap: "$361.32B", circulatingSupply: "19.144M", change: "+1.37%", change1h: "+0.5%", change24h: "-1.2%", change7d: "+3.8%", image: "Images Crypto/BTC.png" },
        { name: "Ethereum", price: "$2,500", marketCap: "$300 billion", circulatingSupply: "115 million ETH", change: "-2.25%", change1h: "-1.1%", change24h: "+0.8%", change7d: "-4.5%", image: "Images Crypto/ETH.png" },

    ];

    const itemsPerPage = 20; // Nombre d'éléments à afficher par page
    let currentPage = 1; // Page actuelle

    // Sélection des boutons de pagination
    const previousButton = document.getElementById("previousPage");
    const nextPageButton = document.getElementById("nextPage");

    // Ajout des gestionnaires d'événements aux boutons de pagination
    previousButton.addEventListener("click", previousPage);
    nextPageButton.addEventListener("click", nextPage);

    // Fonction pour afficher les données dans le tableau
    function displayData() {
        const tableBody = document.querySelector("#cryptoTable tbody");
        tableBody.innerHTML = ""; // Efface le contenu existant du tableau

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        for (let i = startIndex; i < endIndex && i < cryptoData.length; i++) {
            const rowData = cryptoData[i];
            const row = document.createElement('tr');

            // Ajout de l'image et du nom dans la cellule "Name"
            const nameCell = document.createElement('td');
            const nameContent = document.createElement('div');
            nameContent.style.display = "flex";

            const coinImage = document.createElement('img');
            coinImage.src = rowData.image;
            coinImage.alt = rowData.name;
            coinImage.width = 25;
            coinImage.style.marginRight = "20px"; // Ajouter une marge à droite de l'image

            const nameText = document.createElement('span');
            nameText.textContent = rowData.name;

            nameContent.appendChild(coinImage);
            nameContent.appendChild(nameText);
            nameCell.appendChild(nameContent);
            row.appendChild(nameCell);

            // Ajoutez les autres cellules du tableau en fonction des données de chaque crypto-monnaie
            const priceCell = document.createElement('td');
            priceCell.textContent = rowData.price;
            row.appendChild(priceCell);

            const marketCapCell = document.createElement('td');
            marketCapCell.textContent = rowData.marketCap;
            row.appendChild(marketCapCell);

            const circulatingSupplyCell = document.createElement('td');
            circulatingSupplyCell.textContent = rowData.circulatingSupply;
            row.appendChild(circulatingSupplyCell);

            const change1hCell = document.createElement('td');
            change1hCell.textContent = rowData.change1h;
            // Coloration de la cellule
            const changeValue1h = parseFloat(rowData.change1h);
            if (changeValue1h > 0) {
                change1hCell.style.color = '#3bf503'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue1h < 0) {
                change1hCell.style.color = '#ff0505'; // Si la valeur est négative, la couleur du texte est rouge
            }
            row.appendChild(change1hCell);

            const change24hCell = document.createElement('td');
            change24hCell.textContent = rowData.change24h;
            // Coloration de la cellule
            const changeValue24h = parseFloat(rowData.change24h);
            if (changeValue24h > 0) {
                change24hCell.style.color = '#3bf503'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue24h < 0) {
                change24hCell.style.color = '#ff0505'; // Si la valeur est négative, la couleur du texte est rouge
            }
            row.appendChild(change24hCell);

            const change7dCell = document.createElement('td');
            change7dCell.textContent = rowData.change7d;
            // Coloration de la cellule
            const changeValue7d = parseFloat(rowData.change7d);
            if (changeValue7d > 0) {
                change7dCell.style.color = '#3bf503'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue7d < 0) {
                change7dCell.style.color = '#ff0505'; // Si la valeur est négative, la couleur du texte est rouge
            }
            row.appendChild(change7dCell);

            tableBody.appendChild(row);
        }

        updatePagination();
    }

    // Fonction pour mettre à jour l'affichage de la pagination
    function updatePagination() {
        const totalPages = Math.ceil(cryptoData.length / itemsPerPage);
        document.getElementById("currentPage").textContent = currentPage + "/" + totalPages;
    }

    // Fonction pour passer à la page précédente
    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            displayData();
        }
    }

    // Fonction pour passer à la page suivante
    function nextPage() {
        const totalPages = Math.ceil(cryptoData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayData();
        }
    }

    // Afficher les données pour la première fois lors du chargement de la page
    displayData();
});





// Fonction pour remplir le tableau de notifications
function fillNotificationTable(notifications) {
    var tableBody = document.querySelector('#notificationTable tbody');
    tableBody.innerHTML = ''; // Effacer le contenu précédent

    // Parcourir les notifications et ajouter chaque entrée au tableau
    notifications.forEach(function(notification) {
        var row = '<tr>';
        row += '<td>' + notification.date + '</td>'; // Date de la notification
        row += '<td>' + notification.message + '</td>'; // Message de la notification
        row += '</tr>';
        tableBody.innerHTML += row;
    });
}

// Exemple (remplacer par les données réelles du backend)
var notificationsData = [
    { date: '2024-04-07', message: 'Notification 1 ' },
    { date: '2024-04-06', message: 'Notification 2' },
    { date: '2024-04-05', message: 'Notification 3' },
    { date: '2024-04-07', message: 'Notification 1 ' },
    { date: '2024-04-06', message: 'Notification 2' },
    { date: '2024-04-05', message: 'Notification 3' },
    { date: '2024-04-07', message: 'Notification 1 ' },
    { date: '2024-04-06', message: 'Notification 2' },
    { date: '2024-04-05', message: 'Notification 3' },
    { date: '2024-04-07', message: 'Notification 1 ' },
    { date: '2024-04-06', message: 'Notification 2' },
    { date: '2024-04-05', message: 'Notification 3' },
];

// Remplir le tableau avec les données de notification
fillNotificationTable(notificationsData);









document.addEventListener('DOMContentLoaded', function() {
    // Données pour l'exemple
    const hotCoinData = [
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
    ];

    const newListingData = [
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
    ];

    const topGainerCoinData = [
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
    ];

    const topVolumeCoinData = [
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
        { name: "BTC", price: "$73,418.70", change: "+1.37%", image: "Images Crypto/BTC.png" },
        { name: "ETH", price: "$2,500", change: "-2.25%", image: "Images Crypto/ETH.png" },
    ];

    // Remplir les données pour Hot Coin
    const hotCoinTableBody = document.querySelector("#HotCoinTable tbody");
    fillTable(hotCoinTableBody, hotCoinData);

    // Remplir les données pour New Listing
    const newListingTableBody = document.querySelector("#NewListingTable tbody");
    fillTable(newListingTableBody, newListingData);

    // Remplir les données pour Top Gainer Coin
    const topGainerCoinTableBody = document.querySelector("#TopGainerTable tbody");
    fillTable(topGainerCoinTableBody, topGainerCoinData);

    // Remplir les données pour Top Volume Coin
    const topVolumeCoinTableBody = document.querySelector("#TopVolumeCoinTable tbody");
    fillTable(topVolumeCoinTableBody, topVolumeCoinData);

    // Fonction pour remplir les données dans le tableau
    function fillTable(tableBody, data) {
        tableBody.innerHTML = ""; // Efface le contenu existant du tableau

        data.forEach(item => {
            const row = document.createElement('tr');

            // Créer la cellule pour l'image
            const imageCell = document.createElement('td');
            const coinImage = document.createElement('img');
            coinImage.src = item.image;
            coinImage.alt = item.name;
            coinImage.width = 20;
            imageCell.appendChild(coinImage);

            // Créer la cellule pour le nom
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            // Créer la cellule pour le prix
            const priceCell = document.createElement('td');
            priceCell.textContent = item.price;

            // Créer la cellule pour le changement
            const changeCell = document.createElement('td');
            changeCell.textContent = item.change;
            // Coloration de la colonne de changement
            const changeValue = parseFloat(item.change);
            if (changeValue > 0) {
                changeCell.style.color = '#3bf503'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue < 0) {
                changeCell.style.color = '#ff0505'; // Si la valeur est négative, la couleur du texte est rouge
            }

            // Ajouter les cellules à la ligne
            row.appendChild(imageCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(changeCell);

            // Ajouter la ligne au tableau
            tableBody.appendChild(row);
        });
    }

});



