

let allcrypto=[]
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
function reciveinfo(data) {
    console.log('Sending data to backend:', data);
    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/sendtrideinfo/', {
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

            const secondUl = document.createElement('ul');
            data.coininfo.forEach(item => {

                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = formatLargeNumber(item)
                li.appendChild(p);
                secondUl.appendChild(li);
            });
            menuContainer.appendChild(secondUl);
        })
        .catch(error => {
            // Handle errors
            console.error('Error sending data to backend:', error);
        });
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

let allcurreny=[]


async function recivecurronc() {
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

let alltradered=[]
let alltradegreen=[]
async function recivetrade() {
    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendtradeinfo/', {
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
        alltradered=JSON.stringify(data.tradeinfored)
        alltradered = JSON.parse(alltradered)

        alltradegreen=JSON.stringify(data.tradeinfogreen)
        alltradegreen = JSON.parse(alltradegreen)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}








let select1
let select2
let select3
let select4
let select5
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


var h1 = document.getElementById('1h');
var h24 = document.getElementById('24h');
var W1 = document.getElementById('1W');
var M1 = document.getElementById('1M');
function removeChart() {
    var container = document.getElementById('container');
    container.innerHTML = ''; // Remove all child elements inside the container
}
h1.addEventListener("click", function() {
    removeChart()
    var data = {
        operation:'1h',
        time:'1000',
        coin:select5,
    };
    var data3 = {
        operation:'1h',
        time:'1',
        coin:select5,
    };
    reivedata(data);

});
h24.addEventListener("click", function() {
    removeChart()
    var data = {
        operation:'1D',
        time:'365',
        coin:select5,
    };
    reivedata(data);
});
W1.addEventListener("click", function() {
    removeChart()
    var data = {
        operation:'1W',
        time:'52',
        coin:select5,
    };
    reivedata(data);
});
M1.addEventListener("click", function() {
    removeChart()
    var data = {
        operation:'1M',
        time:'12',
        coin:select5,
    };
    reivedata(data);
});



function addNewCandles(newData) {
    var csrftoken = getCookie('csrftoken');

    fetch('http://localhost:8000/hhhhh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ data: newData })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming data contains a single candle
            data = [data]; // Wrap the single candle in an array

            var dataTable = anychart.data.table();
            dataTable.addData(data);

            // Map the loaded data for the candlestick series
            var mapping = dataTable.mapAs({
                'open': 1,
                'high': 3,
                'low': 4,
                'close': 2,
                'x': 0
            });


            var series = chart.plot(0).candlestick(mapping);

            // Set the container and draw the chart
            chart.container('container');
            chart.draw();
        })
        .catch(error => {
            // Handle errors
            console.error('Error adding new candle:', error);
        });
}

function reivedata(data) {

    var csrftoken = getCookie('csrftoken');
    fetch('http://localhost:8000/hhhhh/', {
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
                data=data.data
                var dataTable = anychart.data.table();
                dataTable.addData(data);

                var mapping = dataTable.mapAs({
                    'open': 1,
                    'high': 3,
                    'low': 4,
                    'close': 2,
                    'x': 0
                });

                var chart = anychart.stock();
                anychart.theme('darkGlamour');

                var plot = chart.plot(0);

                plot
                    .yGrid(true)
                    .xGrid(true)
                    .yMinorGrid(true)
                    .xMinorGrid(true);

                var series = plot.candlestick(mapping);
                series.name('');
                series.legendItem().iconType('rising-falling');
                // create a range picker
                var rangePicker = anychart.ui.rangePicker();
                rangePicker.render(chart);
                // create a range selector
                var rangeSelector = anychart.ui.rangeSelector();
                rangeSelector.render(chart);
                // modify the color of the candlesticks
                series.fallingFill("#FF0D0D");
                series.fallingStroke("#FF0D0D");
                series.risingFill("#43FF43");
                series.risingStroke("#43FF43");

                // set the event markers
                var eventMarkers = plot.eventMarkers();
                // set the symbol of the event markers
                plot.eventMarkers().format(function() {
                    return this.getData("symbol");
                });
                // set the event markers data

                // create an annotation
                var annotation = plot.annotations();
                // create a rectangle

                // create a text label
                annotation
                    .label()
                    .xAnchor('2020-03-11')
                    .valueAnchor(75)
                    .anchor('left-top')
                    .offsetY(5)
                    .padding(6)
                    .text('Global Lockdowns — Rise in demand for semiconductor chips')
                    .fontColor('rgba(0,255,226,0.73)')
                    .background({
                        fill: '#098209 0.75',
                        stroke: '0.5 #098209',
                        corners: 2
                    });


                var indicatorPlot = chart.plot(1);
                // map the macd values
                var macdIndicator = indicatorPlot.macd(mapping);
                // set the histogram series
                macdIndicator.histogramSeries('area');
                macdIndicator
                    .histogramSeries().normal().fill('green .3').stroke('green');
                macdIndicator
                    .histogramSeries().normal().negativeFill('red .3').negativeStroke('red');
                // set the second plot's height
                indicatorPlot.height('30%');
                // set the chart display for the selected date/time range

                // Set the title of the chart
                chart.title('CryptoCurrency Chart');
                chart.background().fill('#161616');
                // Set the container id for the chart
                chart.container('container');
                // Initiate the chart drawing
                chart.draw();
            }
        )


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

document.addEventListener("click", function(event) {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");



    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *') ) {
        dropdown1.classList.remove("show");
        dropdown2.classList.remove("show");

    }
});
// Add event listener to detect when select element 2 loses focus



// Function to handle selection in the first dropdown
function myFunction1() {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");
    dropdown1.classList.toggle("show");
    dropdown2.classList.remove("show");

}

function myFunction2() {
    const dropdown1 = document.getElementById("myDropdown");
    const dropdown2 = document.getElementById("myDropdown2");
    dropdown2.classList.toggle("show");
    dropdown1.classList.remove("show");

}



// Set default selections for the dropdowns
document.addEventListener('DOMContentLoaded', async function() {
    await  reciveallcrypto()
    await  recivecurronc()
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
    await recivecurronc()
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
    await recivecurronc()
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
document.addEventListener("click", function(event){
    const dropdown1 = document.getElementById("myDropdown3");
    const dropdown2 = document.getElementById("myDropdown4");



    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *') ) {
        dropdown1.classList.remove("show");
        dropdown2.classList.remove("show");
    }
});
// Add event listener to detect when select element 2 loses focus


function myFunction3(){
    const dropdown1 = document.getElementById("myDropdown3");
    const dropdown2 = document.getElementById("myDropdown4");
    dropdown1.classList.toggle("show");
    dropdown2.classList.remove("show");

}


function myFunction4(){
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
    await recivecurronc()
    // Select the first item in the first dropdown
    const defaultItem1 = allcurreny[0];
    selectItem3(defaultItem1.name);
    const defaultItem2 = allcrypto[0];
    selectItem4(defaultItem2.name);
});

async function selectItem3(itemName) {
    await recivecurronc()
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
    await recivecurronc()
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
//------------------------------------------------------------------------------------------------------------------------
document.addEventListener("click", function(event) {
    const dropdown1 = document.getElementById("myDropdown5");


    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *') && event.target !== button) {
        dropdown1.classList.remove("show");
    }
});

function filterOptions5() {

    const input = document.getElementById("dropdownSearch").value.toUpperCase();
    const dropdownContent = document.getElementById("myDropdown5");
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
// Function to handle selection in the first dropdown
function myFunction5() {
    const dropdown1 = document.getElementById("myDropdown5");
    dropdown1.classList.toggle("show");
}

// Function to handle selection in the second dropdown




// Set default selections for the dropdowns
document.addEventListener('DOMContentLoaded',async function() {
    await reciveallcrypto()
    // Select the first item in the first dropdown
    const defaultItem1 = allcrypto[0];
    selectItem5(defaultItem1.name);
});


async function selectItem5(itemName) {
    await reciveallcrypto()
    const selectedItem = allcrypto.find(item => item.name === itemName);
    const selectedName = selectedItem.name;
    const selectedPhoto = selectedItem.photo;
    // Generate the selected content
    const selectedContent = `<div style="display: flex; align-items: center;">
                                <img src="${selectedPhoto}" alt="${selectedName}" id="selectedPhoto" style="width: 50px; height: 50px;">
                                <p>${selectedName}</p>
                  
                             </div>`;

    // Add the selected content to the desired location
    document.getElementById("selectedItem5").innerHTML = selectedContent;



    // Close the dropdown
    document.getElementById("myDropdown5").classList.remove("show");
    select5 = document.getElementById('selectedItem5').textContent.trim();

    var data = {
        operation:'1h',
        time:'1000',
        coin:select5,
    };

    removeChart()
    reivedata(data);

    reciveinfo(select5)



}




document.addEventListener('DOMContentLoaded', function () {
    generateDropdownContent3();
});

async function generateDropdownContent3() {
    await reciveallcrypto()
    const dropdownContent = document.getElementById('myDropdown5');

    // Clear existing content
    dropdownContent.innerHTML = '';

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.id = 'dropdownSearch';
    searchInput.classList.add('search-bar');
    searchInput.addEventListener('input', filterOptions5);

    // Add event listener to stop event propagation for click events
    searchInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    dropdownContent.appendChild(searchInput);

    // Create dropdown items
    allcrypto.forEach(item => {
        const p = document.createElement('p');
        p.classList.add('dropdown-item');
        p.onclick = function() { selectItem5(item.name); };

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
}

const firstUlData = ["24H Change", "24H High", "24H Low", "24H Volume"];


const menuContainer = document.getElementById('menuContainer');

const firstUl = document.createElement('ul');
firstUlData.forEach(item => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = item;
    li.appendChild(p);
    firstUl.appendChild(li);
});
menuContainer.appendChild(firstUl);

// Create and populate the second <ul>





async function table1() {
    await recivetrade()

    const table = document.getElementById('myTable');

    alltradered.forEach((item, index) => {
        const row = table.insertRow(index + 1);
        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);

        firstNameCell.textContent = item.price;
        firstNameCell.style.color='#ff0000'
        lastNameCell.textContent = item.Qty;
        pointsCell.textContent = item.total;

    });
    const table2 = document.getElementById('myTable2');

    alltradegreen.forEach((item, index) => {
        const row = table2.insertRow(index + 1);
        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);

        firstNameCell.textContent = item.price;
        firstNameCell.style.color='#289b00'
        lastNameCell.textContent = item.Qty;
        pointsCell.textContent = item.total;
    });
}

table1()
async function updateTables() {
    await recivetrade()
    // Clear existing data in both tables
    const table1 = document.getElementById('myTable');
    const table2 = document.getElementById('myTable2');
    table1.innerHTML = '<tr><th>Price</th><th>Qty</th><th>Total</th></tr>';
    table2.innerHTML = '<tr><th></th><th></th><th></th></tr>';

    // Re-populate table1 with updated data from alltradered
    alltradered.forEach((item, index) => {
        const row = table1.insertRow(index + 1);
        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);

        firstNameCell.textContent = item.price;
        firstNameCell.style.color = '#ff0000';
        lastNameCell.textContent = item.Qty;
        pointsCell.textContent = item.total;
    });

    // Re-populate table2 with updated data from alltradegreen
    alltradegreen.forEach((item, index) => {
        const row = table2.insertRow(index + 1);
        const firstNameCell = row.insertCell(0);
        const lastNameCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);

        firstNameCell.textContent = item.price;
        firstNameCell.style.color = '#289b00';
        lastNameCell.textContent = item.Qty;
        pointsCell.textContent = item.total;
    });
}
setInterval(updateTables, 4*1000);

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

