document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            this.classList.toggle("active");
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const contactUsLink = document.querySelector(".contact-us");

    contactUsLink.addEventListener("click", function(event) {
        event.preventDefault(); // Pour empêcher le lien de s'ouvrir immédiatement
        window.location.href = "mailto:projet-ppd@gmail.com"; // Remplacez par votre adresse e-mail
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Données d'actifs (juste un exemple)
    const assets = [
        { coin: 'Bitcoin', amount: 0.5, price: 50000, image: 'Images Crypto/BTC.png' },
        { coin: 'Ethereum', amount: 0.3, price: 3000, image: 'Images Crypto/ETH.png' },
        { coin: 'Tether', amount: 100, price: 1, image: 'Images Crypto/USDT.png' },
        { coin: 'Cardano', amount: 150, price: 2, image: 'Images Crypto/ADA.png' },
        { coin: 'XRP', amount: 200, price: 0.5, image: 'Images Crypto/XRP.png' },
        { coin: 'Solana', amount: 10, price: 150, image: 'Images Crypto/SOL.png' },
        { coin: 'Polkadot', amount: 5, price: 40, image: 'Images Crypto/DOT.png' },
        { coin: 'Dogecoin', amount: 1000, price: 0.2, image: 'Images Crypto/DOGE.png' },
        { coin: 'Dogecoin', amount: 1000, price: 0.2, image: 'Images Crypto/DOGE.png' },
        { coin: 'Polkadot', amount: 5, price: 40, image: 'Images Crypto/DOT.png' },
        { coin: 'Dogecoin', amount: 1000, price: 0.2, image: 'Images Crypto/DOGE.png' },

    ];

    // Sélection de l'élément de la table des actifs
    const assetTable = document.getElementById('asset-items');

    // Nombre d'éléments à afficher par ligne
    const itemsPerRow = 3;
    // Nombre d'éléments à afficher par page
    const itemsPerPage = 6;
    // Indice de la page actuelle
    let currentPage = 1;

    // Fonction pour afficher les actifs
    function displayAssets(page) {
        // Effacer le contenu de la table des actifs
        assetTable.innerHTML = '';
        // Calculer l'indice de début et de fin pour les actifs à afficher sur la page actuelle
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, assets.length);
        // Créer une seule ligne pour chaque groupe de 3 actifs
        for (let i = startIndex; i < endIndex; i += itemsPerRow) {
            const row = document.createElement('tr');
            // Ajouter chaque actif dans une case de la ligne
            for (let j = i; j < Math.min(i + itemsPerRow, endIndex); j++) {
                const asset = assets[j];
                const cell = document.createElement('td');
                const coinImage = document.createElement('img');
                coinImage.src = asset.image || 'default_icon.png';
                coinImage.alt = asset.coin;
                coinImage.width = 20; // Taille de l'image
                cell.appendChild(coinImage);
                cell.innerHTML += `<br>${asset.coin}<br>Price: ${asset.price}<br>Amount: ${asset.amount}`;
                row.appendChild(cell);
            }
            // Ajouter la ligne à la table des actifs
            assetTable.appendChild(row);

        }

        // Afficher ou masquer le bouton "Previous" en fonction de la page actuelle
        const previousButton = document.getElementById('previous');
        if (currentPage > 1) {
            previousButton.style.display = 'inline-block';
        } else {
            previousButton.style.display = 'none';
        }
    }


    // Afficher les actifs lors du chargement de la page
    displayAssets(currentPage);

    // Sélection du bouton "Show more"
    const showMoreButton = document.getElementById('show-more');
    // Ajouter un gestionnaire d'événement pour le clic sur le bouton "Show more"
    showMoreButton.addEventListener('click', function() {
        // Incrémenter le numéro de page actuel
        currentPage++;
        // Afficher les actifs de la nouvelle page
        displayAssets(currentPage);
        // Masquer le bouton "Show more" s'il n'y a plus d'éléments à afficher
        if (currentPage * itemsPerPage >= assets.length) {
            showMoreButton.style.display = 'none';
        }
    });

    // Sélection du bouton "Previous"
    const previousButton = document.getElementById('previous');
// Ajouter un gestionnaire d'événement pour le clic sur le bouton "Previous"
    previousButton.addEventListener('click', function() {
        // Décrémenter le numéro de page actuel
        currentPage--;
        // Afficher les actifs de la nouvelle page
        displayAssets(currentPage);
        // Afficher le bouton "Show more" s'il y a plus d'éléments à afficher
        if (currentPage === 1 && assets.length > itemsPerPage) {
            showMoreButton.style.display = 'inline-block';
        }
    });

});


// Récupérer le bouton et la fenêtre modale
var evaluationButton = document.getElementById("evaluationButton");
var modal = document.getElementById("evaluationModal");

// Récupérer le span qui permet de fermer la fenêtre modale
var span = document.getElementsByClassName("close")[0];

// Ajouter un événement de clic au bouton
evaluationButton.onclick = function() {
    modal.style.display = "block";
}

// Ajouter un événement de clic au span pour fermer la fenêtre modale
span.onclick = function() {
    modal.style.display = "none";
}

// Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Sélection de tous les étoiles
    const stars = document.querySelectorAll('.star');

    // Ajout d'un gestionnaire d'événement de clic à chaque étoile
    stars.forEach(star => {
        star.addEventListener('click', function() {
            // Récupérer la note de l'étoile cliquée
            const rating = parseInt(star.dataset.rating);
            // Appeler la fonction pour sélectionner la note
            selectRating(rating);
        });
    });

    // Fonction pour sélectionner la note
    function selectRating(rating) {
        // Supprimer la classe "selected" de toutes les étoiles
        stars.forEach(star => star.classList.remove('selected'));
        // Ajouter la classe "selected" aux étoiles sélectionnées
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('selected');
        }
        // Afficher le message correspondant à la note
        displayRatingMessage(rating);
    }

    // Fonction pour afficher le message correspondant à la note sélectionnée
    function displayRatingMessage(rating) {
        const message = document.getElementById('ratingMessage');
        switch (rating) {
            case 1:
                message.textContent = "Pas du tout satisfait 😞";
                break;
            case 2:
                message.textContent = "Peut mieux faire 🙂";
                break;
            case 3:
                message.textContent = "Bien mais peut être amélioré 😊";
                break;
            case 4:
                message.textContent = "Très satisfait ! 😄";
                break;
            case 5:
                message.textContent = "Excellente expérience ! 😃";
                break;
            default:
                message.textContent = "Merci d'évaluer notre site !";
        }
    }
    // Fonction pour sélectionner la note
    function selectRating(rating) {
        // Supprimer la classe "selected" de toutes les étoiles
        stars.forEach(star => star.classList.remove('selected'));
        // Ajouter la classe "selected" aux étoiles sélectionnées
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('selected');
        }
        // Afficher le message correspondant à la note
        displayRatingMessage(rating);

        // Remplacer les étoiles par des emojis
        stars.forEach((s, i) => {
            if (i < rating) {
                s.textContent = '⭐'; // Remplacer l'étoile par un emoji d'étoile pleine
            } else {
                s.textContent = '☆'; // Remplacer l'étoile par un emoji d'étoile vide
            }
        });
    }

});
// Désactiver l'événement de copie
document.addEventListener('copy', function(event) {
    event.preventDefault();
    alert("Le copier est désactivé sur ce site.");
});

// Désactiver l'événement de sélection de texte
document.addEventListener('selectstart', function(event) {
    event.preventDefault();
});

// Fonction pour ajuster la taille de la page

function ajusterTaillePage() {
    // Récupérer la largeur et la hauteur de l'écran
    var largeurEcran = window.innerWidth;
    var hauteurEcran = window.innerHeight;

    // Appliquer la taille de l'écran aux éléments de la page
    // Par exemple, vous pouvez ajuster la taille d'un élément avec l'ID "conteneur"
    var conteneur = document.getElementById('conteneur');
    conteneur.style.width = largeurEcran + 'px';
    conteneur.style.height = hauteurEcran + 'px';
}

// Appeler la fonction lors du chargement de la page et lors du redimensionnement de la fenêtre
window.addEventListener('load', ajusterTaillePage);
window.addEventListener('resize', ajusterTaillePage);

// Fonction pour marquer l'élément actif
function markActive(clickedElement) {
    // Supprimer la classe active de tous les éléments du menu
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.classList.remove('active');
    });

    // Ajouter la classe active à l'élément cliqué
    clickedElement.classList.add('active');
}

// Fonction pour afficher la page de connexion  """"remplir par backend """"
function showLoginPage() {
    // Redirection vers la page de connexion
    window.location.href = "login.html";
}

// Fonction pour afficher la page d'inscription
function showSignupPage() {
    // Redirection vers la page d'inscription
    window.location.href = "signup.html";
}

// Fonction pour traduire le site en français
function translateToFrench() {
    // Code pour utiliser l'API de traduction ici
}