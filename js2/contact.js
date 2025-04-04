const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const sendbtn = document.getElementById('send');

sendbtn.addEventListener('submit', sendMessage);
async function sendMessage(event) {
    event.preventDefault();
    const nev = document.getElementById('name').value;
    const telefon = document.getElementById('phone').value;
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
    console.log(res);
    const data = await res.json();
    console.log(data);
    document.getElementById('siker').textContent = data.message;
    console.error("Hiba történt a képek lekérésekor:", error);
}


profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});
