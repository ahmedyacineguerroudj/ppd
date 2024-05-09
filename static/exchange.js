// Event listener to close both dropdowns when clicking outside

recivetransction()
getuserimage()
async function getuserimage() {

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

        document.getElementById("userimage").src=userinfo.image;





    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
async function recivetransction() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/islogin/', {
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
        let a=JSON.stringify(data.islogin)
        if (a==1)
        {
            document.getElementById('after').style.display='block';
            document.getElementById('before').style.display='none';

        }else if (a==2)
        {
            document.getElementById('after').style.display='none';
            document.getElementById('before').style.display='block';
        }



    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}


let select1;
let select2;
var feild2 = document.getElementById('fild1');
var feild1 = document.getElementById('fild2');

var exchange = document.getElementById('exchange_button');


let allcrypto=[]

exchange.addEventListener('click', function(event) {
   
    event.preventDefault();
    var data = {
        feild1: feild1.value,
        feild2: feild2.value,
        select1: select1,
        select2: select2,
    };

    sendtobackend(data);
});
function sendtobackend(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    // You can use AJAX, Fetch API, or any other method to send data to the backend
    fetch('http://localhost:8000/exchange/', {
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
           alert(data.message)
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}

feild1.addEventListener('input', function() {

    var data = {
        field1: feild1.value,
        select1: select1,
        select2: select2,

    };
    sendDataTofild2(data)
});
feild2.addEventListener('input', function() {

    var data = {
        field2: feild2.value,
        select1: select1,
        select2: select2,
    };
    sendDataTofild1(data)
});

function sendDataTofild1(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    // You can use AJAX, Fetch API, or any other method to send data to the backend
    fetch('http://localhost:8000/fild1/', {
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
            var Field1 = document.getElementById('fild2');
            Field1.value = data.totalcrypto1;
            console.log('Response from backend:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}
function sendDataTofild2(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    // You can use AJAX, Fetch API, or any other method to send data to the backend
    fetch('http://localhost:8000/fild2/', {
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
            var Field2 = document.getElementById('fild1');
            Field2.value = data.totalcrypto2;
            console.log('Response from backend:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}

async function reciveallcrypto() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendallcrypto/', {
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
        allcrypto=JSON.stringify(data.allcrypto)
        allcrypto = JSON.parse(allcrypto)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}



// You can also define other functions that use allcrypto here



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
















document.addEventListener("click", function(event) {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");

    const button = document.getElementById("exchange_button");

    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *') && event.target !== button) {
        dropdown1.classList.remove("show");
        dropdown2.classList.remove("show");
        button.style.display = "block"; // Show the button
    }
});
// Add event listener to detect when select element 2 loses focus
document.getElementById("myDropdown2").addEventListener("blur", function() {
    // Show the button again by setting its display property to 'block'
    document.getElementById('exchange_button').style.display = 'block';

});


// Function to handle selection in the first dropdown
function myFunction1() {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");
    dropdown1.classList.toggle("show");
    dropdown2.classList.remove("show");
    document.getElementById("exchange_button").style.display = "block"; // Show the button
}

// Function to handle selection in the second dropdown
function myFunction2() {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");
    dropdown2.classList.toggle("show");
    dropdown1.classList.remove("show");
    const button = document.getElementById("exchange_button");
    if (dropdown2.classList.contains("show")) {
        button.style.display = "none"; // Hide the button when the dropdown is open
    } else {
        button.style.display = "block"; // Show the button when the dropdown is closed
    }
}



// Set default selections for the dropdowns
document.addEventListener('DOMContentLoaded',  async function() {
    await reciveallcrypto()
    const defaultItem1 = allcrypto[0];
    selectItem1(defaultItem1.name);

    // Select the second item in the second dropdown
    const defaultItem2 = allcrypto[1];
    selectItem2(defaultItem2.name);
});

// Function to handle selection in the first dropdown
// Function to handle selection in the first dropdown
async function selectItem1(itemName) {
    await reciveallcrypto()
    const selectedItem = allcrypto.find(item => item.name === itemName);
    const selectedName = selectedItem.name;
    const selectedPhoto = selectedItem.photo;

    // Remove the selected item from the options in the second dropdown
    const dropdown2Options = document.querySelectorAll('#myDropdown2 .dropdown-item');
    dropdown2Options.forEach(option => {
        if (option.textContent.trim() === selectedName) {

            option.style.display = 'none';
        } else {
            option.style.display = '';
        }
    });

    const dropdown2SelectedItem = document.getElementById('selectedItem2').textContent;

    if (dropdown2SelectedItem.trim() === selectedName) {
        // If the selected item in the second dropdown matches the current selection, reset the second dropdown
        document.getElementById('selectedItem2').innerHTML = 'Select';
        document.getElementById('fild2').value = '';
    }

    // Generate the selected content
    const selectedContent = `<div style="display: flex; align-items: center;">
                                <img src="${selectedPhoto}" alt="${selectedName}" id="selectedPhoto" style="width: 20px; height: 20px;">
                                <p>${selectedName}</p>
                             </div>`;

    // Add the selected content to the desired location
    document.getElementById("selectedItem").innerHTML = selectedContent;

    // Close the dropdown
    document.getElementById("myDropdown").classList.remove("show");
    const dropdown1SelectedItem = document.getElementById('selectedItem').textContent.trim();
    select1=dropdown1SelectedItem

    var data = {
        field2: feild2.value,
        select1: select1,
        select2: select2,
    };
    sendDataTofild1(data)
}

// Function to handle selection in the second dropdown
async function selectItem2(itemName) {
    await reciveallcrypto()
    const selectedItem = allcrypto.find(item => item.name === itemName);
    const selectedName = selectedItem.name;
    const selectedPhoto = selectedItem.photo;

    // Remove the selected item from the options in the first dropdown
    const dropdown1Options = document.querySelectorAll('#myDropdown .dropdown-item');
    dropdown1Options.forEach(option => {
        if (option.textContent.trim() === selectedName) {
            option.style.display = 'none';
        } else {
            option.style.display = '';
        }
    });


    const dropdown1SelectedItem = document.getElementById('selectedItem').textContent;
    const dropdown1SelectedItem2 = document.getElementById('selectedItem2').textContent;

    if (dropdown1SelectedItem.trim() === selectedName) {
        // If the selected item in the first dropdown matches the current selection, reset the first dropdown
        document.getElementById('selectedItem').innerHTML = 'Select';
        document.getElementById('fild1').value = '';
    }

    // Generate the selected content
    const selectedContent = `<div style="display: flex; align-items: center;">
                                <img src="${selectedPhoto}" alt="${selectedName}" id="selectedPhoto" style="width: 20px; height: 20px;">
                                <p>${selectedName}</p>
                             </div>`;

    // Add the selected content to the desired location
    document.getElementById("selectedItem2").innerHTML = selectedContent;

    // Close the dropdown
    document.getElementById("myDropdown2").classList.remove("show");
    const dropdown2SelectedItem = document.getElementById('selectedItem2').textContent.trim();
    select2=dropdown2SelectedItem
    var data = {
        field1: feild1.value,
        select1: select1,
        select2: select2,

    };
    sendDataTofild2(data)

}









// Function to filter options in the first dropdown
function filterOptions1() {
    const input = document.getElementById("dropdownSearch").value.toUpperCase();
    const dropdownContent = document.getElementById("myDropdown");
    const dropdownItems = dropdownContent.getElementsByTagName("p");

    // Loop through all dropdown items, and hide those that do not match the search input
    for (let i = 0; i < dropdownItems.length; i++) {
        const optionText = dropdownItems[i].textContent.toUpperCase();
        if (optionText.indexOf(input) > -1) {
            dropdownItems[i].style.display = "";
        } else {
            dropdownItems[i].style.display = "none";
        }
    }
}

// Function to filter options in the second dropdown
function filterOptions2() {
    const input = document.getElementById("dropdownSearch2").value.toUpperCase();
    const dropdownContent = document.getElementById("myDropdown2");
    const dropdownItems = dropdownContent.getElementsByTagName("p");

    // Loop through all dropdown items, and hide those that do not match the search input
    for (let i = 0; i < dropdownItems.length; i++) {
        const optionText = dropdownItems[i].textContent.toUpperCase();
        if (optionText.indexOf(input) > -1) {
            dropdownItems[i].style.display = "";
        } else {
            dropdownItems[i].style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    generateDropdownContent();
});

const dropdownItems = [
    { name: 'BTC', photo: './images/BTC.png' },
    { name: 'Base', photo: './images/94863af2-c980-42cf-a139-7b9f462a36c2.png' },
    { name: 'Blog', photo: 'blog.jpg' },
    { name: 'Contact', photo: 'contact.jpg' },
    { name: 'Custom', photo: 'custom.jpg' },
    { name: 'Support', photo: 'support.jpg' },
    { name: 'Tools', photo: 'tools.jpg' }
];

async function generateDropdownContent() {
    await reciveallcrypto()

    const dropdownContent = document.getElementById('myDropdown');
    // Clear existing content
    dropdownContent.innerHTML = '';

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.id = 'dropdownSearch';
    searchInput.classList.add('search-bar');
    searchInput.addEventListener('input', filterOptions1);

    // Add event listener to stop event propagation for click events
    searchInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    dropdownContent.appendChild(searchInput);

    // Create dropdown items
    allcrypto.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('dropdown-item');
        p.onclick = function() { selectItem1(item.name); };

        const img = document.createElement('img');
        img.src = item.photo;
        img.alt = item.name;
        img.width = 20;

        const span = document.createElement('span');
        span.textContent = item.name;

        p.appendChild(img);
        p.appendChild(span);

        dropdownContent.appendChild(p);
    });

    // Repeat the same process for the second dropdown...

    // Create search input for the second dropdown
    const searchInput2 = document.createElement('input');
    searchInput2.type = 'text';
    searchInput2.placeholder = 'Search...';
    searchInput2.id = 'dropdownSearch2';
    searchInput2.classList.add('search-bar');
    searchInput2.addEventListener('input', filterOptions2);

    // Add event listener to stop event propagation for click events
    searchInput2.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const dropdownContent2 = document.getElementById('myDropdown2');
    dropdownContent2.style.zIndex="111111";
    dropdownContent2.appendChild(searchInput2);

    // Create dropdown items for the second dropdown
    allcrypto.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('dropdown-item');
        p.onclick = function() { selectItem2(item.name); };

        const img = document.createElement('img');
        img.src = item.photo;
        img.alt = item.name;
        img.width = 20;

        const span = document.createElement('span');
        span.textContent = item.name;

        p.appendChild(img);
        p.appendChild(span);

        dropdownContent2.appendChild(p);
    });
}






















document.addEventListener('DOMContentLoaded', function() {
    const faqButton = document.getElementById('faq-button');
    faqButton.addEventListener('click', function() {
        // Scroll the page to the bottom
        window.scrollTo(0, document.body.scrollHeight);
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');


    accordionItems.forEach(item => {
        item.classList.remove('active'); // Remove the 'active' class to hide the answer
        const answer = item.querySelector('.answer');
        answer.style.maxHeight = '0'; // Set max-height to 0 to hide the answer section
    });

    // Add event listeners to accordion links
    accordionItems.forEach(item => {
        const accordionLink = item.querySelector('.accordion-link');

        accordionLink.addEventListener('click', function (e) {
            e.preventDefault();

            const isActive = item.classList.contains('active');

            // Close all accordion items
            accordionItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.answer').style.maxHeight = '0';
            });

            // Open the clicked accordion item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.answer').style.maxHeight = item.querySelector('.answer').scrollHeight + 'px';
            }
        });
    });
});




function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}




var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}










// Function to create a button element
function createButton(name, photo) {
    const button = document.createElement("button");
    button.id = 'dynamicButton';
    button.className = 'logo-button'; // Add a class to the button
    const img = document.createElement("img");
    img.src = photo;
    img.alt = name;
    img.style.width = "40px";
    img.style.height = "40px";
    const textSpan = document.createElement("span");
    textSpan.textContent = name;
    button.appendChild(img);
    button.appendChild(textSpan);
    // Add an event listener to handle button clicks
    button.addEventListener('click', function() {
        // Set the value of the second dropdown to match the clicked logo
        document.getElementById('selectedItem2').innerHTML = `<div style="display: flex; align-items: center;">
                                                                <img src="${photo}" alt="${name}" style="width: 20px; height: 20px;">
                                                                <p>${name}</p>
                                                             </div>`;
        // Close the second dropdown
        document.getElementById("myDropdown2").classList.remove("show");
    });
    return button;
}

// Function to create a button element
async function generateButtons() {
    await reciveallcrypto()

    const logosSlide = document.querySelector(".logos-slide");
    allcrypto.forEach(entry => {
        const button = createButton(entry.name, entry.photo);
        logosSlide.appendChild(button);
    });
}


function cloneLogosSlide() {
    const originalSlide = document.querySelector(".logos-slide");
    const copy = originalSlide.cloneNode(true);
    const logosContainer = document.querySelector(".logos");
    logosContainer.appendChild(copy);

    // Generate buttons for the cloned slide
    const clonedButtons = copy.querySelectorAll('.logo-button');
    clonedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = button.querySelector('span').textContent;
            const photo = button.querySelector('img').src;
            // Set the value of the second dropdown to match the clicked logo
            document.getElementById('selectedItem2').innerHTML = `<div style="display: flex; align-items: center;">
                                                                    <img src="${photo}" alt="${name}" style="width: 20px; height: 20px;">
                                                                    <p>${name}</p>
                                                                 </div>`;
            // Close the second dropdown
            document.getElementById("myDropdown2").classList.remove("show");
        });
    });
}



// Call the function to generate buttons
generateButtons();


// Call the function to clone logos-slide
cloneLogosSlide();





function toggleUserModal() {
    var modal = document.getElementById("userModal");
    closeAllModalsExcept("userModal");
    modal.style.display = "block";
    getuserimage()
}

function closeAllModalsExcept(modalId) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (modal.id !== modalId) {
            modal.style.display = 'none';
        }
    });
    getuserimage()
}

function closeUserModal() {
    var modal = document.getElementById("userModal");
    modal.style.display = "none";
}


document.getElementById("userModal").parentNode.addEventListener("mouseover", toggleUserModal);
document.getElementById("userModal").parentNode.addEventListener("mouseout", closeUserModal);




async function updateUserDetails() {
    await reciveuserinfo()


    document.getElementById('user-id').textContent = userinfo.id;
    document.getElementById('user-first-name').textContent = userinfo.firstName;
    document.getElementById('user-last-name').textContent = userinfo.lastName;
    document.getElementById('user-email').textContent = userinfo.email;
    document.getElementById('user-dob').textContent = userinfo.dob;
}


updateUserDetails();


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

function updatePaginationButtons() {
    const totalTransactions = recentTransactionsExample.length;
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
    const previousButton = document.getElementById('previous-transactions');
    const nextButton = document.getElementById('next-transactions');
    previousButton.style.display = currentPage > 1 ? 'block' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'block' : 'none';
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
    // Afficher les transactions sur la première page lors du chargement de la page
    displayTransactions(currentPage);
});

