
document.addEventListener('DOMContentLoaded', function() {
    var cryptoModal = document.getElementById('cryptoInfoModal');
    var cryptoCloseBtn = cryptoModal.querySelector('.close');
    cryptoCloseBtn.addEventListener('click', function() {
        cryptoModal.style.display = 'none';
    });
    displayCryptoList();
    const searchCryptoBtn = document.getElementById('searchCryptoButton');
    searchCryptoBtn.addEventListener('click', function() {
        searchCrypto();
    });
});

const cryptosData = [
    { name: "crypto 1", price: "$42,000", availableSupply: "18.7M BTC", marketCap: "$787B", change24h: "+3.5%" },
    { name: "crypto 2", price: "$3,000", availableSupply: "117M ETH", marketCap: "$350B", change24h: "+5.2%" },
    { name: "crypto 3", price: "$1.50", availableSupply: "47B XRP", marketCap: "$70B", change24h: "-1.8%" },
    { name: "crypto 4", price: "$200", availableSupply: "66M LTC", marketCap: "$13B", change24h: "+2.1%" }
];

function displayCryptoList() {
    const cryptoListElement = document.getElementById('cryptoList');
    cryptoListElement.innerHTML = ''; // Clear previous list
    cryptosData.forEach(crypto => {
        const cryptoElement = document.createElement('div');
        cryptoElement.classList.add('crypto');

        const cryptoName = document.createElement('span');
        cryptoName.textContent = crypto.name;
        cryptoElement.appendChild(cryptoName);

        const infoButton = document.createElement('button');
        infoButton.textContent = 'Info';
        infoButton.classList.add('info');
        infoButton.addEventListener('click', () => {
            displayCryptoInfo(crypto);
        });
        cryptoElement.appendChild(infoButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            deleteCrypto(crypto, cryptoElement);
        });
        cryptoElement.appendChild(deleteButton);

        cryptoListElement.appendChild(cryptoElement);
    });
}

function displayCryptoInfo(crypto) {
    const modal = document.getElementById('cryptoInfoModal');
    const cryptoInfoContent = document.getElementById('cryptoInfoContent');
    cryptoInfoContent.innerHTML = `
        <p><span class="info-label">Name:</span> <span class="info-value">${crypto.name}</span></p>
        <p><span class="info-label">Price:</span> <span class="info-value">${crypto.price}</span></p>
        <p><span class="info-label">Available Supply:</span> <span class="info-value">${crypto.availableSupply}</span></p>
        <p><span class="info-label">Market Cap:</span> <span class="info-value">${crypto.marketCap}</span></p>
        <p><span class="info-label">Change (24h):</span> <span class="info-value">${crypto.change24h}</span></p>
    `;
    modal.style.display = 'block';
}

function deleteCrypto(crypto, cryptoElement) {
    const index = cryptosData.indexOf(crypto);
    cryptosData.splice(index, 1);
    cryptoElement.remove();
}

function searchCrypto() {
    const input = document.getElementById("cryptoSearchInput");
    const filter = input.value.toUpperCase();
    const cryptoList = document.getElementById("cryptoList");
    const cryptos = cryptoList.getElementsByClassName("crypto");
    for (let i = 0; i < cryptos.length; i++) {
        const txtValue = cryptos[i].textContent || cryptos[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cryptos[i].style.display = "";
        } else {
            cryptos[i].style.display = "none";
        }
    }
}













// pour le chargement de la page
window.addEventListener('load', function() {
    var spinner = document.querySelector('.loading-overlay');
    if (spinner) {
        spinner.style.display = 'none';
    }
});

// Simulons des données d'utilisateurs (c'est juste un exemple)
const usersData = [
    { id: 1, lastName: "Utilisateur 1", firstName: "Ines", email: "utilisateur1@example.com", registered: true, dateOfBirth: "1990-01-01" },
    { id: 2, lastName: "Utilisateur 2", firstName: "Jean", email: "utilisateur2@example.com", registered: false, dateOfBirth: "1985-05-12" },
    { id: 3, lastName: "Utilisateur 3", firstName: "Jean", email: "utilisateur2@example.com", registered: false, dateOfBirth: "1978-11-30" },
    { id: 4, lastName: "Utilisateur 4", firstName: "Jean", email: "utilisateur2@example.com", registered: true, dateOfBirth: "1995-08-20" }
];

// Fonction pour afficher la liste des utilisateurs
function displayUserList() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Clear previous list

    usersData.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        // Ajout du nom de l'utilisateur
        const userName = document.createElement('span');
        userName.textContent = user.lastName ;
        userElement.appendChild(userName);

        // Ajout du bouton "Info"
        const infoButton = document.createElement('button');
        infoButton.textContent = 'Info';
        infoButton.style.fontWeight = 'bold';
        infoButton.style.fontStyle = 'italic';
        infoButton.classList.add('info'); // Ajout de la classe 'info' pour le style CSS
        infoButton.addEventListener('click', () => {
            displayUserInfo(user);
        });
        userElement.appendChild(infoButton);

        // Ajout du bouton "Supprimer"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Block';
        deleteButton.style.fontStyle = 'italic';
        deleteButton.style.fontWeight = 'bold';
        deleteButton.classList.add('delete'); // Ajout de la classe 'delete' pour le style CSS
        deleteButton.addEventListener('click', () => {
            blockUser(user);
        });
        userElement.appendChild(deleteButton);

        userListElement.appendChild(userElement);
    });
}

// Fonction pour afficher les informations détaillées de l'utilisateur dans une fenêtre modale
function displayUserInfo(user) {
    const modal = document.getElementById('userInfoModal');
    const userInfoContent = document.getElementById('userInfoContent');

    // Affichage des informations de l'utilisateur
    userInfoContent.innerHTML = `
        <p><span class="info-label">ID:</span> <span class="info-value">${user.id}</span></p>
        <p><span class="info-label">LastName:</span> <span class="info-value user-name">${user.lastName}</span></p>
        <p><span class="info-label">FirstName:</span> <span class="info-value">${user.firstName}</span></p>
        <p><span class="info-label">Date of Birth:</span> <span class="info-value">${user.dateOfBirth}</span></p>
        <p><span class="info-label">Email:</span> <span class="info-value">${user.email}</span></p>
        <p><span class="info-label">Statut:</span> <span class="info-value">${user.registered ? 'Inscrit' : 'Non inscrit'}</span></p>
    `;

    // Affichage de la fenêtre modale
    modal.style.display = 'block';

    // Gestion de la fermeture de la fenêtre modale
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermeture de la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Fonction pour bloquer un utilisateur
function blockUser(user) {
    console.log(`L'utilisateur ${user.lastName} a été bloqué.`);
}

// Afficher la liste des utilisateurs lors du chargement de la page
displayUserList();

function searchUser() {
    var input, filter, userList, user, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    userList = document.getElementById("userList");
    user = userList.getElementsByClassName("user");
    // Créer la flèche de retour
    const backButton = document.createElement('button');
    backButton.textContent = '←';
    backButton.innerHTML = '<strong>←</strong>';
    backButton.id = 'backButton';
    backButton.style.fontWeight = 'bold'; // Police en gras pour le texte de la flèche
    backButton.style.backgroundColor = '#00efff'; // Couleur de fond de la flèche
    backButton.style.color = 'black'; // Couleur du texte de la flèche
    backButton.style.border = 'none'; // Supprimer la bordure du bouton
    backButton.style.borderRadius = '50%'; // Rendre le bouton rond
    backButton.style.width = '30px'; // Largeur de la flèche
    backButton.style.height = '30px'; // Hauteur de la flèche
    backButton.style.position = 'fixed'; // Position fixe pour rester en haut de la fenêtre
    backButton.style.top = '10px'; // Distance par rapport au haut de la fenêtre
    backButton.style.left = '10px'; // Distance par rapport à la gauche de la fenêtre
    backButton.style.fontSize = '20px'; // Taille de la police de la flèche
    backButton.style.cursor = 'pointer'; // Curseur de la souris en pointeur lorsqu'il survole la flèche


    // Ajouter un événement de clic pour revenir à la première page
    backButton.addEventListener('click', function() {
        displayUserList();
        window.scrollTo(0, 0); // Faire défiler jusqu'au haut de la page

        backButton.style.display = 'none';
    });

    // Ajouter la flèche au début de la liste des utilisateurs
    userList.insertBefore(backButton, userList.firstChild);

    for (i = 0; i < user.length; i++) {
        txtValue = user[i].textContent || user[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            user[i].style.display = "";
        } else {
            user[i].style.display = "none";
        }
    }
}

// Sélectionner le bouton de recherche
const searchButton = document.getElementById('searchButton');
