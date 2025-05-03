import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const nailsLogo = document.getElementsByClassName('logo')[0];
nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});
const btnBack = document.getElementsByClassName('PswBack')[0];
btnBack.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});
const btnSave = document.getElementsByClassName('PswSave')[0]; 
btnSave.addEventListener('click', editProfilePsw);

async function editProfilePsw() {
    const oldPassword = document.getElementById('oldpsw').value;
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;
    if (psw === psw2) {
        const res = await fetch('/api/passwordChange', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword: psw })
        });
        const data = await res.json();
        if (res.ok) {
            await Swal.fire({
                title: `${data.message}`,
                icon: "Success",
                draggable: false
            });
            await logout();
        }else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${data.error}`,
                draggable: false
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "A két jelszó nem egyezik!",
            draggable: false
        });
    };
};

async function logout() {
    const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    })

    console.log(res);

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        window.location.href = ('../index.html');
    } else {
        alert("Hiba a kijelentkezéskor!");
    }
}