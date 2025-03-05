const nailsLogo = document.getElementsByClassName('logo')[0];
const logout = document.getElementsByClassName('logout')[0];
nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});
logout.addEventListener('click', () => {
    window.location.href = ('./index.html');
});

window.addEventListener('DOMContentLoaded', () => { loadData() });

async function loadData() {
    const res = await fetch('/api/getProfile', {
        method: 'GET',
        credentials: 'include'
    })
    console.log(res);
    if (!res.ok) {
        console.error("Hiba az API hívásban");
        return;
    }
    const data = await res.json();
    console.log(data);

    renderCurrentData(data);
}

function renderCurrentData(data) {
    // HTML elemek kiválasztása
    document.getElementById('name').value = data.nev || "";
    document.getElementById('email').value = data.email || "";
    document.getElementById('phone').value = data.telefon || "";
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByClassName('save-btn')[0];
    const passwordChangeLink = document.querySelector('.password-change');
   
    // Űrlap elküldése
    form.addEventListener('submit', async (event) => {
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
    passwordChangeLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/password-change'; // Átirányítás a jelszó módosítási oldalra
    });
});
