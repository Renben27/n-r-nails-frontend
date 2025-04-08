const nailsLogo = document.getElementsByClassName('logo')[0];
const logout = document.getElementsByClassName('logout')[0];
const myData = document.getElementById('myData');
const myBooking = document.getElementById('myBooking');
//const sendbtn = document.getElementById('send');

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});

myData.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

myBooking.addEventListener('click', () => {
    window.location.href = ('./booking.html');
});

logout.addEventListener('click', async () => {
    const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    })

    console.log(res);
    
    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        window.location.href = ('./index.html');
    } else {
        alert("hiba a kijelentkezéskor");
    }
});
/*
sendbtn.addEventListener('submit', sendMessage);
async function sendMessage() {
    const velemeny = document.getElementById('velemeny').value;
    console.log(velemeny);

    const res = await fetch('/api/velemeny', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({velemeny })
    });
    console.log(res);
    if(err){
        console.error("Hiba", error);
    };
};
*/
const form = document.querySelector('form'); // Kiválasztja a form elemet
form.addEventListener('submit', sendMessage);

async function sendMessage(event) {
    event.preventDefault(); // Megakadályozza az alapértelmezett form-submit eseményt
    
    const velemeny = document.getElementById('velemeny').value; // Begyűjti a véleményt
    console.log(velemeny);

    try {
        const res = await fetch('/api/velemeny', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ velemeny }),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            alert('Vélemény sikeresen elküldve!');
        } else {
            alert(data.error || 'Hiba történt az adatküldés során.');
        }
    } catch (error) {
        console.error('Hiba:', error);
        alert('Nem sikerült csatlakozni a szerverhez.');
    }
}