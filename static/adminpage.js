





let users=[]

async function reciveusers() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendalluser/', {
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
        users=JSON.stringify(data.users)
        users = JSON.parse(users)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

function senddata(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/adminpage/', {
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












window.addEventListener('load', function() {
    var spinner = document.querySelector('.loading-overlay');
    if (spinner) {
        spinner.style.display = 'none';
    }
});


async function displayUserList() {
    await reciveusers()
    alert(users)
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Clear previous list

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        // Ajout du nom de l'utilisateur
        const userName = document.createElement('span');
        userName.textContent = 'UserID: '+user.id ;
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
        if (user.baned)
        {
            deleteButton.textContent = 'unblock';
            deleteButton.classList.add('delete2');
        }else
        {
            deleteButton.textContent='Block'
            deleteButton.classList.add('delete');
        }

        deleteButton.style.fontStyle = 'italic';
        deleteButton.style.fontWeight = 'bold';

        deleteButton.addEventListener('click', () => {
            if (deleteButton.textContent == 'Block')
            {
                deleteButton.textContent='unblock'
                deleteButton.classList.remove('delete');
                deleteButton.classList.add('delete2');

                a=1

            }else if (deleteButton.textContent == 'unblock')
            {

                deleteButton.textContent='Block'
                deleteButton.classList.remove('delete2');
                deleteButton.classList.add('delete');

                a=2

            }

            blockUser(user,a);
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
        <p><span class="info-label">WalletID:</span> <span class="info-value">${user.WalletID}</span></p>
        <p><span class="info-label">balance:</span> <span class="info-value">${user.balance}$</span></p>
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
function blockUser(user,a) {

    if (a==1)
    {
        var data ={
            action:'Block',
            id:user.id,
        }
    }else
    {
        var data ={
            action:'unblock',
            id:user.id,
        }
    }


    senddata(data);
}


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
