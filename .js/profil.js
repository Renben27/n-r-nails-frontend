// profile.js - Frontend JavaScript fájl

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.profile-form');
    const passwordChangeLink = document.querySelector('.password-change');

    // Űrlap elküldése
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const profileData = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/profile', {
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
