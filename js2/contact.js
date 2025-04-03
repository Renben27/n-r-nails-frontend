const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const sendbtn = document.getElementById('send');

sendbtn.addEventListener('click', sendMessage);
async function sendMessage() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('uzenet').value;
    console.log(email, name, phone, message);

    const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ 
            nev: name, 
            telefon: phone, 
            email: email, 
            uzenet: message })
    });
    console.log(res); 
    if (!res.ok) {
        throw new Error(`HTTP hiba! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log('Siker:', data);
    alert('Sikeres felvitel!');
    if (err) {
        console.error('Hiba történt:', error);
        alert('Hiba történt az adatok küldése során!');
    }
}


profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});
