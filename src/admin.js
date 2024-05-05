
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
        deleteButton.textContent = 'Delete';
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
    // Ici, vous pouvez implémenter la logique pour bloquer l'utilisateur
    console.log(`L'utilisateur ${user.lastName} a été bloqué.`);
}

// Afficher la liste des utilisateurs lors du chargement de la page
displayUserList();
