import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';
const deletebutton = document.getElementsByClassName('delete-btn')[0];
const nailsLogo = document.getElementsByClassName('logo')[0];
const logout = document.getElementsByClassName('logout')[0];
const myData = document.getElementById('myData');
const myOpinion = document.getElementById('myOpinion');
nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});
myData.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});
myOpinion.addEventListener('click', () => {
    window.location.href = ('./opinion.html');
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
deletebutton.addEventListener('click', deleted);

function deleted() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Biztos vagy benne?",
        text: "Nem tudod visszaállítani!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Igen, törlöm!",
        cancelButtonText: "Mégsem!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Törölve!",
                text: "Foglalás törölve!",
                icon: "success"
            });
        } else if (
             /*Read more about handling dismissals below*/ 
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Sikertelen!",
                text: "Nem sikerült törölni a foglalást:)",
                icon: "error"
            });
        }
    });
}

