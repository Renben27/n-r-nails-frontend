import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';
const deletebutton = document.getElementsByClassName('delete-btn')[0];

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

