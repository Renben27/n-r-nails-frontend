const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('logo')[0];
const arrow = document.getElementsByClassName('back-arrow')[0];

profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('../home.html');
});

arrow.addEventListener('click', () => {
    window.location.href = ('./services.html');
});


// Segédfüggvény az URL paraméter kinyerésére
function getCategoryIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kategoria_id');
}

document.addEventListener('DOMContentLoaded', loadCategoryData);

async function loadCategoryData() {
    const categoryId = getCategoryIdFromURL();
    if (!categoryId) {
        console.error('Hiányzó kategória ID az URL-ben');
        return;
    }

    try {
        const response = await fetch(`/api/category/${categoryId}`);
        const data = await response.json();

        if (!data || !data.nev || !data.kep || !data.szolgaltatasok) {
            console.error('Hiányos adatok érkeztek');
            return;
        }

        const container = document.querySelector('.container');
        container.innerHTML = ''; // Ürítjük a container-t, hogy friss legyen.

        let szolgaltatasokHTML = '';

        data.szolgaltatasok.forEach(service => {
            szolgaltatasokHTML += `
                <label>
                    <input type="radio" name="service" value="${service.szolgaltatas_id}">
                    ${service.nev} - ${service.ar} Ft
                </label><br>
            `;
        });

        container.innerHTML = `
            <div class="card">
                <img src="/uploads/${data.kep}" alt="${data.nev}" class="card-image">

                <div class="card-content">
                    <h1 class="card-title">${data.nev}</h1>

                    <form id="services-form">
                        ${szolgaltatasokHTML}
                    </form>
                </div>
            </div>
        `;

    } catch (err) {
        console.error('Hiba az adatok betöltésekor:', err);
    }
}