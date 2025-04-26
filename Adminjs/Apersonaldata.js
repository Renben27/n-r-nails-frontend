const nailsLogo = document.getElementsByClassName('logo')[0];
const logout = document.getElementsByClassName('logout')[0];
const myBooking = document.getElementById('myBooking');
const myOpinion = document.getElementById('myOpinion');
const changePassword = document.getElementsByClassName('change-password')[0];
const profilSettings = document.getElementById('profilSettings');

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Ahome.html');
});
myBooking.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Abooking.html');
});
myOpinion.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Aopinion.html');
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



async function loadData() {
    const res = await fetch('/api/getProfile', {
        method: 'GET',
        credentials: 'include'
    })
    if (!res.ok) {
        console.error("Hiba az API hívásban");
        return;
    }

    const data = await res.json();
    console.log("Lekért profiladatok:", data); // Ellenőrzés

    if (data) {
        renderCurrentData(data);
    }
}

function renderCurrentData(data) {
    // HTML elemek kiválasztása
    document.getElementById('name').value = data.nev || "";
    document.getElementById('email').value = data.email || "";
    document.getElementById('phone').value = data.telefon || "";
}

profilSettings.addEventListener('submit', async (event) => {
    event.preventDefault();



    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name === null && phone === null && email === null) {
        alert('Minden mezőt tölts ki');
        return;
    }

    const profileData = {
        name: name,
        phone: phone,
        email: email
    };

    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        if (response.ok) {
            alert('A profiladatok sikeresen frissítve!');
        } else {
            alert('Hiba történt a profiladatok frissítése közben.');
        }
    } catch (error) {
        console.error('Hálózati hiba:', error);
        alert('Hálózati hiba lépett fel.');
    }
});
// Jelszó módosítás link eseménye
changePassword.addEventListener('click', () => {
    window.location.href = './Adminhtml/Apasswordchange.html';
});

loadData();
//admin