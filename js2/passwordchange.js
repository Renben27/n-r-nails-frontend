import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';


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
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
                draggable: false
            }).then(() => {
                logout();
            });
        } else {
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
            text: "A két jelszó nem egyezik",
            draggable: false
        });
    };
};
