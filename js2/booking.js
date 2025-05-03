import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const navigateTo = (url) => window.location.href = url;

document.querySelector('.logo')?.addEventListener('click', () => navigateTo('./home.html'));
document.getElementById('myData')?.addEventListener('click', () => navigateTo('./personaldata.html'));
document.getElementById('myOpinion')?.addEventListener('click', () => navigateTo('./opinion.html'));

document.querySelector('.logout')?.addEventListener('click', logoutUser);
window.addEventListener('DOMContentLoaded', loadBookings);

async function logoutUser() {
    const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
    });

    if (response.ok) {
        navigateTo('./index.html');
    } else {
        alert("Hiba a kijelentkezéskor");
    }
}

async function loadBookings() {
    const response = await fetch('/api/myBooking', {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) return;

    const bookings = await response.json();
    displayBookings(bookings);
}

function displayBookings(bookings) {
    const container = document.querySelector('.bookings');
    container.innerHTML = '';

    bookings.forEach(({ datum, szolgaltatas_nev, ar, foglalas_id }) => {
        const element = document.createElement('div');
        element.className = 'dropdown';
        element.innerHTML = `
            <span class="date">${formatDate(datum)}</span>
            <div class="dropdown-content">
                <p class="services">Szolgáltatás: ${szolgaltatas_nev}</p>
                <p class="price">Ár: ${ar} Ft</p>
                <button class="delete-btn" data-id="${foglalas_id}">Lemondás</button>
            </div>
        `;
        container.appendChild(element);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => confirmDelete(button.dataset.id));
    });
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('hu-HU');
}

function confirmDelete(foglalasId) {
    Swal.fire({
        title: "Biztos vagy benne?",
        text: "Nem tudod visszaállítani!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Igen, törlöm!",
        cancelButtonText: "Mégsem!",
        reverseButtons: true,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteBooking(foglalasId);
        } else {
            Swal.fire("Megszakítva!", "Foglalásod még él :)", "error");
        }
    });
}

async function deleteBooking(id) {
    const response = await fetch(`/api/deleteBooking/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (response.ok) {
        Swal.fire("Törölve!", "Foglalás törölve!", "success");
        loadBookings();
    } else {
        Swal.fire("Hiba!", "Nem sikerült törölni a foglalást.", "error");
    }
}
