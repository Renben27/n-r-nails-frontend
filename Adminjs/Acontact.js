const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const sendbtn = document.getElementById('send');
profileIcon.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Apersonaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Ahome.html');
});

sendbtn.addEventListener('submit', sendMessage);
async function sendMessage(event) {
    event.preventDefault();
    const nev = document.getElementById('nev').value;
    const telefon = document.getElementById('telefon').value;
    const email = document.getElementById('email').value;
    const uzenet = document.getElementById('uzenet').value;
    console.log(nev, telefon, email, uzenet);

    const res = await fetch('/api/contact', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ nev, telefon, email, uzenet })
    });
    if (res.ok) {
        console.log(res);
        alert ('Siker');
    }else{
        alert('Hiba');
    }; 
};


//admin