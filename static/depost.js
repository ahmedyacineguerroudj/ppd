
        document.getElementById("userimage").src=userinfo.image;





    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}


getuserimage()
let recentTransactions=[]

var confirm = document.getElementById('confirm');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var cardNumber = document.getElementById('cardNumber');
var expiryDate = document.getElementById('expiryDate');
var cvv = document.getElementById('cvv');
var Country = document.getElementById('Country');
var city = document.getElementById('city');
var Address = document.getElementById('Address');
var checkbox = document.getElementById('checkbox');
var postalCode = document.getElementById('postalCode');
var amount = document.getElementById('amount');
var amount2 = document.getElementById('amount2');
var WithdrawSubmit = document.getElementById('WithdrawSubmit');
var myBtn3 = document.getElementById('myBtn3');

WithdrawSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    var data = {
        amount: amount2.value,
        operation: WithdrawSubmit.value,
    };

    if(isUsed)
    {
        if(isFormFilled2()) {
            sendtobackend(data);
        }else
        {
            alert("Please enter the amount")
        }
    }else
    {
        alert("Please choose a payment card")
    }
});
myBtn3.addEventListener('click', function(event) {
    event.preventDefault();
    var data = {
        amount: amount.value,
        operation: myBtn3.value,
    };
    if(isUsed)
    {
        if(isFormFilled1()) {
            sendtobackend(data);
        }else
        {
            alert("Please enter the amount")
        }
    }else
    {
        alert("Please choose a payment card")
    }
});

function sendtobackend(data) {

    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/depost&withdraw/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ data: data })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success response if needed
            return response.json();
        })
        .then(data => {
            displayTransactions(currentPage)
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}
confirm.addEventListener('click', function() {
    var data = {
        firstName: firstName.value,
        lastName: lastName.value,
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvv: cvv.value,
        Country: Country.value,
        city: city.value,
        Address: Address.value,
        checkbox: checkbox.value,
        code_postal: postalCode.value,
    };
    sendcardinfo(data);
});


function sendcardinfo(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/validthecard/', {
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
            var containerDiv = document.getElementById("container");
            containerDiv.style.display = "block"; // Ensure container is displayed
            var currentCardCount = containerDiv.getElementsByClassName("card").length;
            if (currentCardCount < 3) {
                for (var i = 0; i < 3 - currentCardCount; i++) {
                    createCard(currentCardCount + i);
                }
            }
          alert(
              data.message
          )
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
            body: JSON.stringify({ data: "outtransctuins" })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        recentTransactions=JSON.stringify(data.transactions)
        recentTransactions = JSON.parse(recentTransactions)

    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
let visacardes=[]
async function recivevisacard() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendallvisacard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ data: "outtransctuins" })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        visacardes=JSON.stringify(data.visacads)
        visacardes = JSON.parse(visacardes)

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





document.addEventListener('DOMContentLoaded', function() {
    var depositButton = document.getElementById("Deposit_button");
    var withdrawButton = document.getElementById('Withdraw_button');
    var withdrawFram = document.getElementById('Withdraw-fram');
    withdrawFram.style.display = 'none';
    withdrawFram.disabled = true;

    const deposit = () => {
        depositButton.classList.add('active');
        withdrawButton.classList.remove('active');
        document.getElementById('Deposit-fram').style.display = 'block';
        document.getElementById('Deposit-fram').disabled = false;
        // Hide and disable Withdraw-fram when Deposit button is clicked
        withdrawFram.style.display = 'none';
        withdrawFram.disabled = true;
    };

    const withdraw = () => {
        withdrawButton.classList.add('active');
        depositButton.classList.remove('active');
        document.getElementById('Deposit-fram').style.display = 'none';
        document.getElementById('Deposit-fram').disabled = true;

        withdrawFram.style.display = 'block';
        withdrawFram.disabled = false;
    };

    depositButton.addEventListener('click', deposit);
    withdrawButton.addEventListener('click', withdraw);
});





var modal = document.getElementById("myModal");


var btn = document.getElementById("myBtn");


var closeBtn = document.getElementById("close");


btn.onclick = function() {
    modal.style.display = "block";
}


closeBtn.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
var modal2 = document.getElementById("myModal2");

var btn2 = document.getElementById("myBtn2");

var closeBtn = document.getElementsByClassName("close2")[0];

btn2.onclick = function() {
    modal2.style.display = "block";
}

closeBtn.onclick = function(){
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
}

//-------------------------------------------------------------------
let isUsed = false;

function updateCardLayout() {
    var containerDiv = document.getElementById("container");
    var cards = containerDiv.getElementsByClassName("card");

    // Calculate top position for each card
    var topPosition = 0;
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.top = topPosition + "px";
        topPosition += cards[i].offsetHeight + 20; // Add 20px gap between cards
    }
}

async function toggleAddCardButton() {
    await recivevisacard()
    const addButton = document.getElementById('myBtn');
    if (visacardes.length >= 3) {
        addButton.style.display = 'none';
    } else {
        addButton.style.display = 'block';
    }
}

// Define constant with card information
// Function to update card layout
function isFormFilled1() {


    return (amount.value !== ''  );
}
function isFormFilled2() {


    return (amount2.value !== ''  );
}
// Function to create card and append it to container
async function createCard(index) {
    await recivevisacard()
    var containerDiv = document.getElementById("container");
    var currentCardCount = containerDiv.getElementsByClassName("card").length;

    if (currentCardCount >= 3) {
        return;
    }

    var cardInfo = visacardes[index]; // Get card information at specified index

    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    var topPosition = index * 20; // Adjust the value according to your design
    cardDiv.style.top = topPosition + "px";

    var logoSpan = document.createElement("span");
    logoSpan.classList.add("logo");
    logoSpan.innerHTML = '<svg viewBox="0 0 256 83" height="83" width="256" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient y2="100%" y1="-2.006%" x2="54.877%" x1="45.974%" id="logosVisa0"><stop stop-color="#222357" offset="0%"></stop><stop stop-color="#254AA5" offset="100%"></stop></linearGradient></defs><path transform="matrix(1 0 0 -1 0 82.668)" d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"></path></svg>';

    var removeSpan = document.createElement("span");
    removeSpan.classList.add("remove");

    var numberSpan = document.createElement("span");
    numberSpan.classList.add("number");
    var lastFourDigits = cardInfo.number.substring(cardInfo.number.length - 4);
    numberSpan.textContent = '**** **** **** ' + lastFourDigits;

    var ownerSpan = document.createElement("span");
    ownerSpan.classList.add("owner");
    ownerSpan.textContent = cardInfo.owner;

    // Create button element
    var addButton = document.createElement("button");
    addButton.classList.add("Btn");
    addButton.textContent = "Use";
    isUsed = false



// Add click event listener to the "Use" button
    addButton.addEventListener("click", function() {

        if (addButton.textContent == "Use")
        {
            isUsed = true;
            addButton.textContent="Unuse"
           modal2.style.display = "none";
        }else
        {
            isUsed = false;
            addButton.textContent="Use"
        }

    });



    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("viewBox", "0 0 576 512");
    svgIcon.classList.add("svgIcon");

// Create path element
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z");

// Append path to svg
    svgIcon.appendChild(path);

// Append SVG to button
    addButton.appendChild(svgIcon);

// Append button to card div
    cardDiv.appendChild(addButton);


// Append spans to card div
    cardDiv.appendChild(logoSpan);
    cardDiv.appendChild(removeSpan);
    cardDiv.appendChild(numberSpan);
    cardDiv.appendChild(ownerSpan);
    cardDiv.appendChild(addButton); // Append addButton to the card div


    cardDiv.appendChild(logoSpan);
    cardDiv.appendChild(removeSpan);
    cardDiv.appendChild(numberSpan); // Append number span to card div
    cardDiv.appendChild(ownerSpan); // Append owner span to card div




    // Add click event listener to remove button
    removeSpan.addEventListener("click", function() {
        containerDiv.removeChild(cardDiv); // Remove the card from the container

        // Remove the corresponding card information from the array
        visacardes.splice(index, 1);


        updateCardLayout();


        toggleAddCardButton();
    });

    // Append card div to container
    containerDiv.appendChild(cardDiv);

    // Toggle add card button visibility
    toggleAddCardButton();
}




document.getElementById("myBtn2").addEventListener("click", function() {
    var containerDiv = document.getElementById("container");
    containerDiv.style.display = "block"; // Ensure container is displayed
    var currentCardCount = containerDiv.getElementsByClassName("card").length;
    if (currentCardCount < 3) {
        for (var i = 0; i < 3 - currentCardCount; i++) {
            createCard(currentCardCount + i);
        }
    }
});









//------------------------------------------------------------------




function generateTable() {
    // Define the data
    const customers = [
        { company: "Alfreds Futterkiste", contact: "Maria Anders", country: "Germany" },
        { company: "Berglunds snabbköp", contact: "Christina Berglund", country: "Sweden" },
        { company: "Centro comercial Moctezuma", contact: "Francisco Chang", country: "Mexico" },
        { company: "Ernst Handel", contact: "Roland Mendel", country: "Austria" },
        { company: "Island Trading", contact: "Helen Bennett", country: "UK" },
        { company: "Königlich Essen", contact: "Philip Cramer", country: "Germany" },
        { company: "Laughing Bacchus Winecellars", contact: "Yoshi Tannamuri", country: "Canada" },
        { company: "Magazzini Alimentari Riuniti", contact: "Giovanni Rovelli", country: "Italy" },
        { company: "North/South", contact: "Simon Crowther", country: "UK" },
        { company: "Paris spécialités", contact: "Marie Bertrand", country: "France" }
    ];

    // Create table element
    const table = document.createElement('table');
    table.id = "customers"; // Assign id to the table

    // Create table header
    const headerRow = document.createElement('tr');
    ["Name", "Price", "Country"].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows
    customers.forEach(customer => {
        const row = document.createElement('tr');
        Object.values(customer).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    // Get the div container
    const tableContainer = document.getElementById('tableContainer');

    // Clear previous content of the container
    tableContainer.innerHTML = '';

    // Append the table to the div container
    tableContainer.appendChild(table);
}

// Call the function when the HTML document is loaded
window.onload = function() {
    generateTable();
};
async function displayTransactions(page) {
    try {
        await recivetransction();
        const startIndex = (page - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;

        transactionList.innerHTML = '';

        // Display transactions for the current page
        recentTransactions.slice(startIndex, endIndex).forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.date} - ${transaction.type}: ${transaction.amount} ${transaction.currency}`;
            transactionList.appendChild(listItem);
        });
        updatePaginationButtons();
    } catch (error) {
        // Handle errors
        console.error('Error in displayTransactions:', error);
    }
}

//------------------------------
function toggleNotificationModal() {
    var modal = document.getElementById("notificationModal");
    closeAllModalsExcept("notificationModal");
    modal.style.display = "block";
}

function toggleUserModal() {
    getuserimage()
    var modal = document.getElementById("userModal");
    closeAllModalsExcept("userModal");
    modal.style.display = "block";
}

function closeAllModalsExcept(modalId) {
    getuserimage()
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


    const assetTable = document.getElementById('asset-items');


    const showMoreButton = document.getElementById('show-more');
    const previousButton = document.getElementById('previous');


    const itemsPerPage = 5;
    let currentPage = 1;


    function displayAssets(page) {

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        assetTable.innerHTML = '';

        assets.slice(startIndex, endIndex).forEach(asset => {
            const row = document.createElement('tr');
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
            const amountCell = document.createElement('td');
            amountCell.textContent = asset.amount;
            row.appendChild(amountCell);
            const priceCell = document.createElement('td');
            priceCell.textContent = asset.price;
            row.appendChild(priceCell);
            assetTable.appendChild(row);
        });

        showMoreButton.style.display = endIndex < assets.length ? 'block' : 'none';

        previousButton.style.display = page > 1 ? 'block' : 'none';
    }

    showMoreButton.addEventListener('click', function() {
        currentPage++;
        displayAssets(currentPage);
    });

    previousButton.addEventListener('click', function() {
        currentPage--;
        displayAssets(currentPage);
    });

    displayAssets(currentPage);
});





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

function updatePaginationButtons() {

    const totalTransactions = recentTransactionsExample.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

}

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

    displayTransactions(currentPage);
});

