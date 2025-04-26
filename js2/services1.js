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
// services1.js

// Segédfüggvény az URL paraméter kinyerésére
function getCategoryIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

// Főfüggvény async-await változattal
async function loadCategoryData() {
    const categoryId = getCategoryIdFromURL();
    if (!categoryId) {
        console.error('Hiányzó kategória ID az URL-ben');
        return;
    }

    try {
        const response = await fetch(`/api/category-data/${categoryId}`);
        const data = await response.json();

        if (!data || !data.kategoriak || !data.szolgaltatasok) {
            console.error('Hiányos adatok érkeztek');
            return;
        }

        const container = document.querySelector('.container');
        container.innerHTML = '';

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="/uploads/${data.kategoriak.kep}" alt="${data.kategoriak.nev}" class="card-image">
            <div class="card-content">
                <h1 class="card-title">${data.kategoriak.nev}</h1>
                <form id="services-form">
                    ${data.szolgaltatasok.map(service => `
                        <label>
                            <input type="radio" name="service" value="${service.szolgaltatas_id}">
                            ${service.nev} - ${service.ar}
                        </label><br>
                    `).join('')}
                </form>
            </div>
        `;

        container.appendChild(card);

    } catch (err) {
        console.error('Hiba az adatok betöltésekor:', err);
    }
}

// Indítás oldalbetöltéskor
document.addEventListener('DOMContentLoaded', loadCategoryData);
