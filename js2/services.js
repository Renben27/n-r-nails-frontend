const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const booking = document.getElementById('pedikur-button');
const booking2 = document.getElementById('gellak-button');
const booking3 = document.getElementById('extram-button');
const booking4 = document.getElementById('mbuild-button');
const booking5 = document.getElementById('specials-button');
const booking6 = document.getElementById('weddingm-button');

profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('../home.html');
});

document.addEventListener('click', function (event) {
    if (event.target && event.target.id === buttonId) {
        window.location.href = '../services1.html?category=' + kategoria_id;
    }
});

booking2.addEventListener('click', () => {
    window.location.href = ('../services2.html');
});

booking3.addEventListener('click', () => {
    window.location.href = ('../services3.html');
});

booking4.addEventListener('click', () => {
    window.location.href = ('../services4.html');
});

booking5.addEventListener('click', () => {
    window.location.href = ('../services5.html');
});

booking6.addEventListener('click', () => {
    window.location.href = ('../services6.html');
});
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/services')
        .then(response => response.json())
        .then(data => {
            var container = document.querySelector('.container-card');
            var categories = {};

            data.forEach(function (item) {
                if (!categories[item.kategoria_id]) {
                    categories[item.kategoria_id] = {
                        nev: item.kategoria_nev,
                        kep: item.kep,
                        services: []
                    };
                }
                if (item.szolgaltatas_nev) {
                    categories[item.kategoria_id].services.push({
                        nev: item.szolgaltatas_nev,
                        ar: item.ar
                    });
                }
            });

            Object.entries(categories).forEach(([kategoria_id, category]) => {
                var card = document.createElement('div');
                card.classList.add('card');

                var servicesHtml = '';
                category.services.forEach(function (service) {
                    servicesHtml += `<p>${service.nev}: ${service.ar}</p>`;
                });

                // Létrehozzuk az egyedi gomb ID-t (pl: pedikur-button)
                var safeCategoryName = category.nev.toLowerCase()
                    .replace(/\s+/g, '-') // szóköz helyett kötőjel
                    .replace(/[^\w\-]/g, ''); // ékezetek, spec karakterek kiszűrése

                var buttonId = 'category-button-' + kategoria_id;

                card.innerHTML = `
                    <img src="/images/${category.kep}" alt="${category.nev}" class="card-image">
                    <div class="card-content">
                        <h1 class="card-title">${category.nev}</h1>
                        ${servicesHtml}
                        <button id="${buttonId}">Időpont foglalás</button>
                    </div>
                `;

                container.appendChild(card);

                // Gomb esemény hozzáadása
                document.addEventListener('click', function (event) {
                    if (event.target && event.target.id === buttonId) {
                        // Itt irányítjuk át a felhasználót
                        window.location.href = '../services1.html?category=' + kategoria_id;
                    }
                });
            });
        })
        .catch(error => {
            console.error('Hiba történt az adatok betöltésekor:', error);
        });
});
