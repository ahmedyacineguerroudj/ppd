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


document.getElementById("userModal").parentNode.addEventListener("mouseover", toggleUserModal);
document.getElementById("userModal").parentNode.addEventListener("mouseout", closeUserModal);




async function updateUserDetails() {
    await reciveuserinfo()
    alert(userinfo)
    document.getElementById('user-id').textContent = userinfo.id;
    document.getElementById('user-first-name').textContent = userinfo.firstName;
    document.getElementById('user-last-name').textContent = userinfo.lastName;
    document.getElementById('user-email').textContent = userinfo.email;
    document.getElementById('user-dob').textContent = userinfo.dob;
}


updateUserDetails();
