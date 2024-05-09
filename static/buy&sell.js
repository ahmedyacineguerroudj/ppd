
recivetransction()

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
let allcrypto=[]


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


let allcurreny=[]


async function recivecurroncy() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendallcurroncy/', {
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
        allcurreny=JSON.stringify(data.currencylist)
        allcurreny = JSON.parse(allcurreny)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

let hotCrypto = [];
let currency = [];
setInterval(updatePrices, 60000);
async function recivehotcrypto() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendhotcrypto/', {
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

        hotCrypto=JSON.stringify(data.hotcryotolist)
        hotCrypto = JSON.parse(hotCrypto)
        currency=JSON.stringify(data.currencylist)
        currency = JSON.parse(currency)

    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}

async function recivecurrency() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendcurrecny/', {
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
        currency=JSON.stringify(data.currencylist)
        currency = JSON.parse(currency)

    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}













let select1
let select2
let select3
let select4
var Field2 = document.getElementById('fild2');
var Sell2 = document.getElementById('Sell2');
var Buy2 = document.getElementById('Buy2');






Buy2.addEventListener("click", function() {

    var data = {
        operation:Buy2.value,
        field1:Field1.value,
        field2: Field2.value,
        select1: select1,
        select2: select2,

    };
    sendselldata(data);
});

Sell2.addEventListener("click", function() {

    var data = {
        operation:Sell2.value,
        field1:Field3.value,
        field2: Field4.value,
        select1: select3,
        select2: select4,

    };
    sendselldata(data);
});
Field2.addEventListener('input', function() {
    var data = {
        field2: Field2.value,
        select1: select1,
        select2: select2,
    };
    sendDataTofild1(data);
});

var Field1 = document.getElementById('fild1');
Field1.addEventListener('input', function() {
    var data = {
        field1: Field1.value,
        select1: select1,
        select2: select2,
    };

    sendDataTofild2(data);

});
var Field3 = document.getElementById('fild3');
Field3.addEventListener('input', function() {
    var data = {
        field1: Field3.value,
        select1: select3,
        select2: select4,
    };

    sendDataTofild4(data);
});
var Field4 = document.getElementById('fild4');
Field4.addEventListener('input', function() {
    var data = {
        field2: Field4.value,
        select1: select3,
        select2: select4,
    };

    sendDataTofild3(data);
});

function sendselldata(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/butandsell/', {
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
         alert(
             data.message
         )
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}



function sendDataTofild1(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
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
            var Field1 = document.getElementById('fild1');
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
            var Field2 = document.getElementById('fild2');
            Field2.value = data.totalcrypto2;
            console.log('Response from backend:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}

function sendDataTofild3(data) {
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
            var Field3 = document.getElementById('fild3');
            Field3.value = data.totalcrypto1;
            console.log('Response from backend:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
}
function sendDataTofild4(data) {
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
            var Field4 = document.getElementById('fild4');
            Field4.value = data.totalcrypto2;
            console.log('Response from backend:', data);
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

function toggleCard(action) {
    const flipCardInner = document.querySelector('.flip-card__inner');
    const buyButton = document.getElementById('buyButton');
    const sellButton = document.getElementById('sellButton');

    if (action === 'buy') {
        buyButton.style.textDecoration = 'underline';
        sellButton.style.textDecoration = 'none';
        flipCardInner.style.transform = 'rotateY(0deg)';
    } else if (action === 'sell') {
        buyButton.style.textDecoration = 'none';
        sellButton.style.textDecoration = 'underline';
        flipCardInner.style.transform = 'rotateY(180deg)';
    }
}








const pathData = "M384 576q0-26 19-45t45-19h896q26 0 45 19t19 45-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45z";
const pathData2 = "M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z";
const color = "#00ffe2";
const color2 = "#B9101E";
const color3 ="#ffffff";
function generateCardHTML(data, cardClass, percentClass, rangeClass, pathData, color, imageid, nameid, percentid, priceid) {
    // Calculate the width of the fill based on the percentage
    const fillWidth = `${data.percentage}%`;
    return ` 
        <div class="${cardClass}">
            <div class="title4">    
                <img id="${imageid}" class="photo" src=${data.image}>
                <p  id="${nameid}" class="title-text">${data.name}</p>
                <p id="${percentid}" class="${percentClass}">
                   <svg width="20" height="20" fill="${color}" viewBox="0 0 1792 1792" xmlns=""> <path d="${pathData}"></path> </svg>  ${data.percentage}%
                </p>
                
            </div>
            <div class="data">
                <p id="${priceid}">${data.price} €</p>
                <div class="${rangeClass}">
                    <div class="fill" style="width: ${fillWidth};"></div>
                </div>
            </div>
        </div>
    `;
}
function formatPrice(price) {
    const num = Number(price);

    if (isNaN(num)) {
        return price;
    }

    // Check if the absolute value of the number is less than 1
    if (Math.abs(num) < 1) {
        // Use toFixed(8) to preserve up to 8 decimal places
        return num.toFixed(8).replace(/\.?0+$/, ''); // Remove trailing zeros
    } else {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
function formatLargeNumber(number) {
    const abbreviations = {
        T: 1000000000000,
        B: 1000000000,
        M: 1000000,
        K: 1000
    };

    for (const abbreviation in abbreviations) {
        if (number >= abbreviations[abbreviation]) {
            return (number / abbreviations[abbreviation]).toFixed(2) + abbreviation;
        }
    }

    return formatPrice(number)
}
function generateCardHTML2(data) {
    return `    
        <div class="card">
            <div class="card-inner">
                <div class="card-front">
                    <img class="photo3" src="${data.image}"> <img class="photo3" src="${data.image2}">
                    <p> BTC to ${data.name}</p>
                </div>
                <div class="card-back"> 
                    <p> 1 BTC = ${data.price} ${ data.name} </p>
                   
                    
                </div>
            </div>
        </div>
    `;
}
window.onload = async function() {

    await recivehotcrypto();
    await recivecurrency();
    var container5 = document.getElementById('container5');
    var container6 = document.getElementById('container6');

    let priceid, percentid, nameid, imageid, styleid;
    let i = 1;
    hotCrypto.forEach(function (item) {
        if(i<=6) {
            priceid = 'cryptoPrice' + i;
            percentid = 'cryptopercent' + i;
            nameid = 'cryptoname' + i;
            imageid = 'cryptoimage' + i;
            styleid = 'style' + i;

            item.price=formatLargeNumber(item.price)
            if (item.percentage < 0) {

                item.percntage = item.percentage * (-1)


                container5.innerHTML += generateCardHTML(item, 'card3', 'percent', 'range', pathData, color2, imageid, nameid, percentid, priceid, styleid);
            } else if (item.percentage > 0) {
                container5.innerHTML += generateCardHTML(item, 'card4', 'percent6', 'range6', pathData2, color, imageid, nameid, percentid, priceid, styleid);
            } else {
                container5.innerHTML += generateCardHTML(item, 'card4', 'percent6', 'range6', pathData2, color3, imageid, nameid, percentid, priceid, styleid);
            }
            i++
        }
    });


    currency.forEach(function (item) {
        item.price=formatLargeNumber(item.price)
        container6.innerHTML += generateCardHTML2(item);
    })

};

async function updatePrices() {
    await recivehotcrypto();

    let i = 1;

    hotCrypto.forEach(function(item) {
        let priceid = 'cryptoPrice' + i;
        let percentid = 'cryptopercent' + i;
        let nameid = 'cryptoname' + i;
        let imageid = 'cryptoimage' + i;
        let styleid = 'style' + i;

        var priceElement = document.getElementById(priceid);
        var percentElement = document.getElementById(percentid);
        var nameElement = document.getElementById(nameid);
        var imageElement = document.getElementById(imageid);



        priceElement.textContent = formatLargeNumber(item.price) + " €";

        if (item.percentage <0) {
            item.percentage=item.percentage*(-1)

            percentElement.innerHTML = `
                <svg width="20" height="20" fill="${color2}" viewBox="0 0 1792 1792" xmlns=""> 
                    <path d="${pathData}"></path> 
                </svg>  
                ${item.percentage}%
              
            `;


        } else if (item.percentage >0) {
            percentElement.innerHTML = `
                <svg width="20" height="20" fill="${color}" viewBox="0 0 1792 1792" xmlns=""> 
                    <path d="${pathData2}"></path> 
                </svg>  
                ${item.percentage}%
              
            `;
        } else {
            percentElement.innerHTML = `
                <svg width="20" height="20" fill="${color3}" viewBox="0 0 1792 1792" xmlns=""> 
                    <path d="${pathData}"></path> 
                </svg>  
                ${item.percentage2}%
              
            `;
        }
        console.log( item.price, item.percentage)





        i++;
    });
}






//.....................................................................


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
























//====================================================================================================================

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
document.addEventListener('DOMContentLoaded', async function() {
    await  reciveallcrypto()
    await  recivecurroncy()
    // Select the first item in the first dropdown
    const defaultItem1 = allcrypto[0];
    selectItem1(defaultItem1.name);

    // Select the second item in the second dropdown
    const defaultItem2 = allcurreny[0];
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
    select2 = document.getElementById('selectedItem').textContent.trim();

    var data = {
        field1: Field1.value,
        select1: select1,
        select2: select2,
    };

    sendDataTofild2(data)
}

// Function to handle selection in the second dropdown
async function selectItem2(itemName) {
    await recivecurrency()
    const selectedItem = allcurreny.find(item => item.name === itemName);
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

    // Check if the selected item is already selected in the first dropdown
    const dropdown1SelectedItem = document.getElementById('selectedItem').textContent;


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
    select1 = document.getElementById('selectedItem2').textContent.trim();


    var data = {
        field2: Field2.value,
        select1: select1,
        select2: select2,
    };

    sendDataTofild1(data)
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




async function generateDropdownContent() {
    await reciveallcrypto()
    await recivecurroncy()
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
    allcurreny.forEach(item => {
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
document.addEventListener("click", function(event) {
    const dropdown1 = document.getElementById("myDropdown3");
    const dropdown2 = document.getElementById("myDropdown4");

    const button = document.getElementById("exchange_button");

    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *') && event.target !== button) {
        dropdown1.classList.remove("show");
        dropdown2.classList.remove("show");
        button.style.display = "block"; // Show the button
    }
});
// Add event listener to detect when select element 2 loses focus
document.getElementById("myDropdown4").addEventListener("blur", function() {
    // Show the button again by setting its display property to 'block'
    document.getElementById('exchange_button').style.display = 'block';

});


// Function to handle selection in the first dropdown
function myFunction3() {
    const dropdown1 = document.getElementById("myDropdown3");
    const dropdown2 = document.getElementById("myDropdown4");
    dropdown1.classList.toggle("show");
    dropdown2.classList.remove("show");
    document.getElementById("exchange_button").style.display = "block"; // Show the button
}

// Function to handle selection in the second dropdown
function myFunction4() {
    const dropdown1 = document.getElementById("myDropdown3");
    const dropdown2 = document.getElementById("myDropdown4");
    dropdown2.classList.toggle("show");
    dropdown1.classList.remove("show");
    const button = document.getElementById("exchange_button");
    if (dropdown2.classList.contains("show")) {
        button.style.display = "none";
    } else {
        button.style.display = "block";
    }
}


document.addEventListener('DOMContentLoaded',  async function() {
    await reciveallcrypto()
    await recivecurroncy()
    // Select the first item in the first dropdown
    const defaultItem1 = allcurreny[0];
    selectItem3(defaultItem1.name);
    const defaultItem2 = allcrypto[0];
    selectItem4(defaultItem2.name);
});

async function selectItem3(itemName) {
    await recivecurroncy()
    const selectedItem = allcurreny.find(item => item.name === itemName);
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

    const dropdown2SelectedItem = document.getElementById('selectedItem4').textContent;
    if (dropdown2SelectedItem.trim() === selectedName) {
        // If the selected item in the second dropdown matches the current selection, reset the second dropdown
        document.getElementById('selectedItem4').innerHTML = 'Select';
        document.getElementById('fild2').value = '';
    }

    // Generate the selected content
    const selectedContent = `<div style="display: flex; align-items: center;">
                                <img src="${selectedPhoto}" alt="${selectedName}" id="selectedPhoto" style="width: 20px; height: 20px;">
                                <p>${selectedName}</p>
                             </div>`;

    // Add the selected content to the desired location
    document.getElementById("selectedItem3").innerHTML = selectedContent;

    // Close the dropdown
    document.getElementById("myDropdown3").classList.remove("show");
    select3 = document.getElementById('selectedItem3').textContent.trim();


    var data = {
        field2: Field4.value,
        select2: select4,
        select1: select3,
    };

    sendDataTofild3(data)
}

// Function to handle selection in the second dropdown
async function selectItem4(itemName) {
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

    // Check if the selected item is already selected in the first dropdown
    const dropdown1SelectedItem = document.getElementById('selectedItem3').textContent;

    if (dropdown1SelectedItem.trim() === selectedName) {
        // If the selected item in the first dropdown matches the current selection, reset the first dropdown
        document.getElementById('selectedItem3').innerHTML = 'Select';
        document.getElementById('fild1').value = '';
    }

    // Generate the selected content
    const selectedContent = `<div style="display: flex; align-items: center;">
                                <img src="${selectedPhoto}" alt="${selectedName}" id="selectedPhoto" style="width: 20px; height: 20px;">
                                <p>${selectedName}</p>
                             </div>`;

    // Add the selected content to the desired location
    document.getElementById("selectedItem4").innerHTML = selectedContent;

    // Close the dropdown
    document.getElementById("myDropdown4").classList.remove("show");
    select4 = document.getElementById('selectedItem4').textContent.trim();

    var data = {
        field1: Field3.value,
        select1: select3,
        select2: select4,
    };
    sendDataTofild4(data)
}





function filterOptions3() {
    const input = document.getElementById("dropdownSearch3").value.toUpperCase();
    const dropdownContent = document.getElementById("myDropdown3");
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
function filterOptions4() {
    const input = document.getElementById("dropdownSearch4").value.toUpperCase();
    const dropdownContent = document.getElementById("myDropdown4");
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
    generateDropdownContent2();
});

async function generateDropdownContent2() {
    await reciveallcrypto()
    await recivecurroncy()
    const dropdownContent = document.getElementById('myDropdown3');

    // Clear existing content
    dropdownContent.innerHTML = '';

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.id = 'dropdownSearch3';
    searchInput.classList.add('search-bar');
    searchInput.addEventListener('input', filterOptions3);

    // Add event listener to stop event propagation for click events
    searchInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    dropdownContent.appendChild(searchInput);

    // Create dropdown items
    allcurreny.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('dropdown-item');
        p.onclick = function() { selectItem3(item.name); };

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


    // Create search input for the second dropdown
    const searchInput2 = document.createElement('input');
    searchInput2.type = 'text';
    searchInput2.placeholder = 'Search...';
    searchInput2.id = 'dropdownSearch4';
    searchInput2.classList.add('search-bar');
    searchInput2.addEventListener('input', filterOptions4);

    // Add event listener to stop event propagation for click events
    searchInput2.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const dropdownContent2 = document.getElementById('myDropdown4');
    dropdownContent2.style.zIndex="111111";
    dropdownContent2.appendChild(searchInput2);

    // Create dropdown items for the second dropdown
    allcrypto.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('dropdown-item');
        p.onclick = function() { selectItem4(item.name); };

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