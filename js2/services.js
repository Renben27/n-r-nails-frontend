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

// Lekéri a kategóriákat az API-ból és kirajzolja a kártyákat
document.addEventListener('DOMContentLoaded', () => {
    fetchCategoriesAndServices();
});

function fetchCategoriesAndServices() {
    fetch('/api/categories-with-services') // EZ az endpoint hívódik meg
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error('Hibás adatok:', data);
                return;
            }
            renderCategories(data);
        })
        .catch(err => {
            console.error('Hiba az adatok lekérésekor:', err);
        });
}

function renderCategories(categories) {
    const container = document.querySelector('.cards-container');
    container.innerHTML = ''; // ürítjük előtte

    categories.forEach(category => {
        const card = document.createElement('div');
        card.classList.add('card');

        // A card belseje
        card.innerHTML = `
        <img src="uploads/${category.kep}" alt="${category.nev}" class="card-image">
        <div class="card-content">
          <h1 class="card-title">${category.nev}</h1>
          ${category.szolgaltatasok.map(service => `
            <p>${service.nev}: ${service.ar}</p>
          `).join('')}
          <button id="button-${category.kategoria_id}">Időpont foglalás</button>
        </div>
      `;

        container.appendChild(card);

        // Gomb eseménykezelő hozzáadása
        const button = document.getElementById(`button-${category.kategoria_id}`);
        button.addEventListener('click', () => {
            window.location.href = `services1.html?category=${category.kategoria_id}`;
        });
    });
}

