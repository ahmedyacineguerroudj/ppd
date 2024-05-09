




let market=[]
let hotcrypto=[]
let topvaluecrypto=[]
let topgainercrypto=[]
let newlistedcrypto=[]
async function recivemarket() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendmarket/', {
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
        market=JSON.stringify(data.listmarket)
        market = JSON.parse(market)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}
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
        hotcrypto=JSON.stringify(data.hotcryotolist)
        hotcrypto = JSON.parse(hotcrypto)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}


async function recivetopvaluecryotolist() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendtopvaluecrypto/', {
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
        topvaluecrypto=JSON.stringify(data.topvaluecryotolist)
        topvaluecrypto = JSON.parse(topvaluecrypto)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}


async function recivetopgainercrypto() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendtopgainercrypto/', {
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
        topgainercrypto=JSON.stringify(data.topgainerlist)
        topgainercrypto = JSON.parse(topgainercrypto)


    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
}



async function recivenewlistedcrypto() {

    try {
        var csrftoken = getCookie('csrftoken');
        const response = await fetch('http://localhost:8000/sendnewlistedcrypto/', {
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
        newlistedcrypto=JSON.stringify(data.newlisted)
        newlistedcrypto = JSON.parse(newlistedcrypto)


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
// Gestionnaires d'événements pour le survol de souris


document.getElementById("userModal").parentNode.addEventListener("mouseover", toggleUserModal);
document.getElementById("userModal").parentNode.addEventListener("mouseout", closeUserModal);





document.addEventListener('DOMContentLoaded', function () {

    const itemsPerPage = 20; // Nombre d'éléments à afficher par page
    let currentPage = 1; // Page actuelle

    // Sélection des boutons de pagination
    const previousButton = document.getElementById("previousPage");
    const nextPageButton = document.getElementById("nextPage");

    // Ajout des gestionnaires d'événements aux boutons de pagination
    previousButton.addEventListener("click", previousPage);
    nextPageButton.addEventListener("click", nextPage);

    // Fonction pour afficher les données dans le tableau
   async function displayData() {
       await recivemarket()


        const tableBody = document.querySelector("#cryptoTable tbody");
        tableBody.innerHTML = ""; // Efface le contenu existant du tableau

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        let a=1
        for (let i = startIndex; i < endIndex && i < market.length; i++) {

            let priceid = 'cryptoPrice' + a+currentPage;
            let percentid1h = 'cryptopercent1h' + a+currentPage;
            let percentid1d = 'cryptopercent1d' + a+currentPage;
            let percentid7d = 'cryptopercent7d' + a+currentPage;
            let nameid = 'cryptoname' + a+currentPage
            let imageid = 'cryptoimage' + a+currentPage;
            let marketCapid = 'marketCap' + a+currentPage;
            let circulatingSupplyid = 'circulatingSupply' + a+currentPage;
            let Volume24hid = 'Volume24h' + a+currentPage;
            let rankid = 'rank' + a+currentPage;


            const rowData = market[i];
            const row = document.createElement('tr');

            // Ajout de l'image et du nom dans la cellule "Name"
            const nameCell = document.createElement('td');
            const nameContent = document.createElement('div');
            nameContent.style.display = "flex";

            const coinImage = document.createElement('img');
            coinImage.id=imageid
            coinImage.src = rowData.image;
            coinImage.width = 25;
            coinImage.style.marginRight = "20px"; // Ajouter une marge à droite de l'image

            const rankCell = document.createElement('td');
            rankCell.textContent = rowData.rank;
            rankCell.id=rankid
            row.appendChild(rankCell);

            const nameText = document.createElement('span');
            nameText.textContent = rowData.name;
            nameText.id=nameid


            nameContent.appendChild(coinImage);
            nameContent.appendChild(nameText);
            nameCell.appendChild(nameContent);
            row.appendChild(nameCell);


            // Ajoutez les autres cellules du tableau en fonction des données de chaque crypto-monnaie
            const priceCell = document.createElement('td');

            priceCell.textContent = '$'+formatPrice(rowData.price);
            priceCell.id=priceid
            row.appendChild(priceCell);
            const change1hCell = document.createElement('td');

            // Coloration de la cellule
            const changeValue1h = parseFloat(rowData.change1h);
            if (changeValue1h > 0) {
                change1hCell.textContent = '+'+rowData.change1h+'%';
                change1hCell.style.color = '#83f28f'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue1h < 0) {
                change1hCell.textContent = rowData.change1h+'%';
                change1hCell.style.color = '#f94449'; // Si la valeur est négative, la couleur du texte est rouge
            }
            change1hCell.id=percentid1h
            row.appendChild(change1hCell);

            const change24hCell = document.createElement('td');

            // Coloration de la cellule
            const changeValue24h = parseFloat(rowData.change24h);
            if (changeValue24h > 0) {
                change24hCell.textContent = '+'+rowData.change24h+'%';
                change24hCell.style.color = '#83f28f'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue24h < 0) {
                change24hCell.textContent = rowData.change24h+'%';
                change24hCell.style.color = '#f94449'; // Si la valeur est négative, la couleur du texte est rouge
            }
            change24hCell.id=percentid1d
            row.appendChild(change24hCell);

            const change7dCell = document.createElement('td');

            // Coloration de la cellule
            const changeValue7d = parseFloat(rowData.change7d);
            if (changeValue7d > 0) {
                change7dCell.textContent = '+'+rowData.change7d+'%';
                change7dCell.style.color = '#83f28f'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue7d < 0) {
                change7dCell.textContent =+rowData.change7d+'%';
                change7dCell.style.color = '#f94449'; // Si la valeur est négative, la couleur du texte est rouge
            }
            change7dCell.id=percentid7d
            row.appendChild(change7dCell);



            const marketCapCell = document.createElement('td');
            marketCapCell.textContent = formatLargeNumber(rowData.marketCap);
            marketCapCell.id=marketCapid
            row.appendChild(marketCapCell);

            const Volume24hCall = document.createElement('td');
            Volume24hCall.textContent = formatLargeNumber(rowData.Volume24h);
            Volume24hCall.id=Volume24hid
            row.appendChild(Volume24hCall);


            const circulatingSupplyCell = document.createElement('td');
            circulatingSupplyCell.textContent =formatLargeNumber( rowData.circulatingSupply);
            circulatingSupplyCell.id=circulatingSupplyid
            row.appendChild(circulatingSupplyCell);

            tableBody.appendChild(row);
            a++
        }


        updatePagination();
       setInterval(accessAndModifyElements, 5000);
    }

    // Fonction pour mettre à jour l'affichage de la pagination
    async function updatePagination() {
       await recivemarket()
        const totalPages = Math.ceil(market.length / itemsPerPage);
        document.getElementById("currentPage").textContent = currentPage + "/" + totalPages;
    }

    // Fonction pour passer à la page précédente
    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            displayData();
        }
    }


    async function nextPage() {
       await recivemarket()
        const totalPages = Math.ceil(market.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayData();
        }
    }


     displayData();





     function accessAndModifyElements() {
         recivemarket();
         console.log('iam in')




         let a = 1;
         let b = 0;
         let d = 1;


         for (let j = 1; j < currentPage; j++) {
             d += 20;
             b += 20;
         }



         market.slice(d-1).forEach((item) => {

           if(a<=20) {

            let priceid = 'cryptoPrice' + a + currentPage;
            let percentid1h = 'cryptopercent1h' + a + currentPage;
            let percentid1d = 'cryptopercent1d' + a + currentPage;
            let percentid7d = 'cryptopercent7d' + a + currentPage;
            let nameid = 'cryptoname' + a + currentPage;
            let imageid = 'cryptoimage' + a + currentPage;
            let marketCapid = 'marketCap' + a + currentPage;
            let circulatingSupplyid = 'circulatingSupply' + a + currentPage;
            let Volume24hid = 'Volume24h' + a + currentPage;
            let rankid = 'rank' + a + currentPage;
            const rank = document.getElementById(rankid);



            if (rank) {

                if (rank.textContent == item.rank) {


                    const price = document.getElementById(priceid);
                    const percent1d = document.getElementById(percentid1d);
                    const percent1h = document.getElementById(percentid1h);
                    const percent7d = document.getElementById(percentid7d);
                    const marketCap = document.getElementById(marketCapid);
                    const Volume24h = document.getElementById(Volume24hid);
                    const circulatingSupplyi = document.getElementById(circulatingSupplyid)


                    price.textContent = '$'+formatPrice(item.price);
                    if (item.downorup>0)
                    {
                        changeColorForTwoSeconds(price,'#83f28f')
                    }else if (item.downorup<0)
                    {
                        changeColorForTwoSeconds(price,'#f94449')
                    }

                    const changeValue1h = parseFloat(item.change1h);
                    if (changeValue1h > 0) {
                        percent1h.textContent = '+'+item.change1h+'%';
                        percent1h.style.color = '#83f28f';
                    } else if (changeValue1h < 0) {
                        percent1h.textContent = item.change1h+'%';
                        percent1h.style.color = '#f94449';
                    }

                    const changeValue24 = parseFloat(item.change24h);
                    if (changeValue24 > 0) {
                        percent1d.textContent = '+'+item.change24h+'%';
                        percent1d.style.color = '#83f28f';
                    } else if (changeValue24 < 0) {
                        percent1d.textContent = item.change24h+'%';
                        percent1d.style.color = '#f94449';
                    }

                    const changeValue7d = parseFloat(item.change7d);
                    if (changeValue7d > 0) {
                        percent7d.textContent = '+'+item.change7d+'%';
                        percent7d.style.color = '#83f28f';
                    } else if (changeValue7d < 0) {
                        percent7d.textContent = item.change7d+'%';
                        percent7d.style.color = '#f94449';
                    }
                    Volume24h.textContent = formatLargeNumber(item.Volume24h);
                    marketCap.textContent = formatLargeNumber(item.marketCap);
                    circulatingSupplyi.textContent = formatLargeNumber(item.circulatingSupply);


                }
            }else
            {
                const namecrypto = document.getElementById(nameid);
                const price = document.getElementById(priceid);
                const percent1d = document.getElementById(percentid1d);
                const percent1h = document.getElementById(percentid1h);
                const percent7d = document.getElementById(percentid7d);
                const marketCap = document.getElementById(marketCapid);
                const Volume24h = document.getElementById(Volume24hid);
                const circulatingSupplyi = document.getElementById(circulatingSupplyid);
                const image = document.getElementById(imageid);


                namecrypto.textContent=item.name
                price.textContent = "$"+formatPrice(item.price);
                if (item.downorup>0)
                {
                    changeColorForTwoSeconds(price,'#83f28f')
                }else if (item.downorup<0)
                {
                    changeColorForTwoSeconds(price,'#ff0000')
                }
                const changeValue1h = parseFloat(item.change1h);
                if (changeValue1h > 0) {
                    percent1h.textContent = '+'+item.change1h+'%';
                    percent1h.style.color = '#83f28f'; // Si la valeur est positive, la couleur du texte est verte
                } else if (changeValue1h < 0) {
                    percent1h.textContent = item.change1h+'%';
                    percent1h.style.color = '#f94449'; // Si la valeur est négative, la couleur du texte est rouge
                }

                const changeValue24 = parseFloat(item.change24h);
                if (changeValue24 > 0) {
                    percent1d.textContent = '+'+item.change24h+'%';
                    percent1d.style.color = '#83f28f'; // Si la valeur est positive, la couleur du texte est verte
                } else if (changeValue24 < 0) {
                    percent1d.textContent = item.change24h+'%';
                    percent1d.style.color = '#f94449'; // Si la valeur est négative, la couleur du texte est rouge
                }

                const changeValue7d = parseFloat(item.change7d);
                if (changeValue7d > 0) {
                    percent7d.textContent = '+'+item.change7d+'%';
                    percent7d.style.color = '#83f28f';
                } else if (changeValue7d < 0) {
                    percent7d.textContent = item.change7d+'%';
                    percent7d.style.color = '#f94449';
                }
                Volume24h.textContent = formatLargeNumber(item.Volume24h);
                marketCap.textContent = formatLargeNumber(item.marketCap);
                circulatingSupplyi.textContent = formatLargeNumber(item.circulatingSupply);
                image.src = item.image;
                image.width = 25;
                image.style.marginRight = "20px";
            }
               a++;
               d++
            }


        });
    }

});

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

    return formatPrice(number) // Fallback to default formatting
}


function changeColorForTwoSeconds(element, color) {
    // Save the original color
    const originalColor = element.style.color;

    // Change the color to the specified color
    element.style.color = color;

    // Revert the color back to the original after 2 seconds
    setTimeout(() => {
        element.style.color = originalColor;
    }, 3000); // 2 seconds in milliseconds
}


// Fonction pour remplir le tableau de notifications


// Exemple (remplacer p












document.addEventListener('DOMContentLoaded', async function() {
    await recivehotcrypto()
    await recivetopgainercrypto()
    await recivenewlistedcrypto()
    await recivetopvaluecryotolist()

    const hotCoinTableBody = document.querySelector("#HotCoinTable tbody");
    fillTable(hotCoinTableBody, hotcrypto,10);

    // Remplir les données pour New Listing
    const newListingTableBody = document.querySelector("#NewListingTable tbody");
    fillTable(newListingTableBody, newlistedcrypto,20);

    // Remplir les données pour Top Gainer Coin
    const topGainerCoinTableBody = document.querySelector("#TopGainerTable tbody");
    fillTable(topGainerCoinTableBody, topgainercrypto,30);

    // Remplir les données pour Top Volume Coin
    const topVolumeCoinTableBody = document.querySelector("#TopVolumeCoinTable tbody");
    fillTable(topVolumeCoinTableBody, topvaluecrypto,40);

    // Fonction pour remplir les données dans le tableau
    function fillTable(tableBody, data,number) {
        tableBody.innerHTML = ""; // Efface le contenu existant du tableau
        let a=1
        data.forEach(item => {

            let priceid = 'cryptoPrice' + a+number;
            let percentid1d = 'cryptopercent1d' + a+number;
            let nameid = 'cryptoname' + a+number;
            let imageid = 'cryptoimage' + a+number;




            const row = document.createElement('tr');

            // Créer la cellule pour l'image
            const imageCell = document.createElement('td');
            const coinImage = document.createElement('img');
            coinImage.id=imageid
            coinImage.src = item.image;
            coinImage.width = 20;
            imageCell.appendChild(coinImage);

            // Créer la cellule pour le nom
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            nameCell.id=nameid

            // Créer la cellule pour le prix
            const priceCell = document.createElement('td');
            priceCell.textContent = '$'+item.price;
            priceCell.id=priceid

            // Créer la cellule pour le changement
            const changeCell = document.createElement('td');
            changeCell.id=percentid1d
            // Coloration de la colonne de changement
            const changeValue = parseFloat(item.percentage);
            if (changeValue > 0) {
                changeCell.textContent = '+'+item.percentage+'%';
                changeCell.style.color = '#3bf503'; // Si la valeur est positive, la couleur du texte est verte
            } else if (changeValue < 0) {
                changeCell.textContent = item.percentage+'%';
                changeCell.style.color = '#ff0505'; // Si la valeur est négative, la couleur du texte est rouge
            }

            // Ajouter les cellules à la ligne
            row.appendChild(imageCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(changeCell);

            // Ajouter la ligne au tableau
            tableBody.appendChild(row);
            a++
        });
        setInterval(changetables, 5000);
    }
    function changetables() {
        recivehotcrypto()
        recivetopgainercrypto()
        recivenewlistedcrypto()
        recivetopvaluecryotolist()

        let data=[]
        let j=10
        while (j<=40)
        {
            console.log(j)
            if(j==10)
            {

                data=hotcrypto
            }if(j==20)
            {

                data=newlistedcrypto
            }if(j==30)
            {

                data=topgainercrypto
            }if(j==40)
            {

                data=topvaluecrypto
            }
            let a=1
            data.forEach(function(item) {

                let priceid = 'cryptoPrice' + a+j;
                let percentid1d = 'cryptopercent1d' + a+j;
                let nameid = 'cryptoname' + a+j;
                let imageid = 'cryptoimage' + a+j;


                const price = document.getElementById(priceid);
                const percent1d = document.getElementById(percentid1d);
                const name = document.getElementById(nameid);
                const image = document.getElementById(imageid);


                image.src = item.image;
                image.width = 20;

                name.textContent = item.name;


                price.textContent = '$' + formatLargeNumber(item.price);

                const percentage = parseFloat(item.percentage);
                if (percentage > 0) {
                    percent1d.textContent = '+' + item.percentage + '%';
                    percent1d.style.color = '#83f28f';
                } else if (percentage < 0) {
                    percent1d.textContent = item.percentage + '%';
                    percent1d.style.color = '#f94449';
                }

            a++
            });
            j=j+10
        }

    }
});

recive()
async function recive() {

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
        const data =await  response.json();
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
