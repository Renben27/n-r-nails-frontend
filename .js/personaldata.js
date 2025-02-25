document.addEventListener("DOMContentLoaded", function () {
    const editName = document.getElementById("felhasznev");
    const editPsw = document.getElementsByClassName('edit-button')[0];
    const fileInput = document.getElementById("fileInput");
    const logoutButton = document.getElementById("logout");
    const saveNameButton=document.getElementById("mentes");
    const nailsLogo=document.getElementsByClassName("nailslogo")[0];

    nailsLogo.addEventListener('click', () => {
        window.location.href = ('../home.html');
    });


    // **Profilnév módosítása**
    saveNameButton.addEventListener('click', editProfileName);
    async function editProfileName() {
        const felhasznev = document.getElementById('felhasznev').value;
        console.log(felhasznev);
        const res = await fetch(`http://localhost:3000/api/editProfileName`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ felhasznev }),
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            alert(data.message);
            window.location.href = '../personaldataok.html';
        } else {
            alert(data.console.error);
        }
    };



    editPsw.addEventListener('click', editProfilePsw);
    //profiljelszó módosítása
    async function editProfilePsw() {
        const psw= document.getElementById('psw').value;
        const psw2= document.getElementById('psw2').value;
        console.log(psw);
        if (psw!==psw2) {
            return alert('A két jelszó nem egyezik!');
    
        }
        const res= await fetch('http://localhost:3000/api/editProfilePsw',  {
            method:'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({ psw }),
            credentials: 'include'
        });
        console.log(res);
         const data= await res.json();
         console.log(data);
         if (res.ok) {
            alert(data.message);
            logout();
         }else{
            alert(data.error);
         }
    }
//
    // **Képfeltöltés**
    document.querySelector(".profile-pic button").addEventListener("click", async function () {
        const file = fileInput.files[0];
        if (!file) {
            alert("Válassz egy képet!");
            return;
        }

        const formData = new FormData();
        formData.append("kep", file);

        try {
            const response = await fetch(`http://localhost:3000/api/upload`, {
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            alert(data.message);

        } catch (error) {
            console.error("Hiba történt:", error);
        }
    });

    // **Kijelentkezés**
    logoutButton.addEventListener("click", async function () {
        try {
            const response = await fetch(`http://localhost:3000/api/logout`, {
                method: "POST",
                credentials: 'include'
            });

            const data = await response.json();
            alert(data.message || "Hiba történt!");

            if (response.ok) {
                localStorage.removeItem("token");
                window.location.href = "/login.html";
            }

        } catch (error) {
            console.error("Hiba történt:", error);
        }
    });
});
