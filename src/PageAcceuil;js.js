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


// Définition des fonctions agrandirEcran() et reduireEcran()
function agrandirEcran() {
    // Exemple : Ajuster la taille de la police
    document.body.style.fontSize = "20px";
    console.log("Écran agrandi !");
}

function reduireEcran() {
    // Exemple : Ajuster la taille de la police
    document.body.style.fontSize = "16px";
    console.log("Écran réduit !");
}

// Vérification de la taille de l'écran lorsqu'elle change
function verifierTailleEcran(mediaQuery) {
    if (mediaQuery.matches) {
        agrandirEcran();
    } else {
        reduireEcran();
    }
}

// Déclaration du media query
const mediaQuery = window.matchMedia('(max-width: 600px)');

// Vérification initiale de la taille de l'écran
verifierTailleEcran(mediaQuery);

// Ajout d'un écouteur d'événement pour surveiller les changements de la taille de l'écran
mediaQuery.addEventListener("change", function() {
    verifierTailleEcran(mediaQuery);
});

