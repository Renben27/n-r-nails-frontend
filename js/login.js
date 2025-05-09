const btnLogin = document.getElementsByClassName('login')[0];

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    console.log(email, psw);

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, psw }),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);



    if (res.ok) {
        if (data.isAdmin === 1) {
            alert(data.message)
            window.location.href = './Adminhtml/Ahome.html';
        } else {
            alert(data.message);
            window.location.href = './home.html';
        }
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
        }
        alert(errorMessage);
    } else if (data.error) {
        alert(data.error);
    } else {
        alert('Ismeretlen hiba');
    }
}