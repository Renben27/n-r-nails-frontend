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

        if (!data || !data.kategoriak || !data.szolgaltatasok) {
            console.error('Hiányos adatok érkeztek');
            return;
        }

        const container = document.querySelector('.container');
        container.innerHTML = ''; // Ürítjük a container-t, hogy ne legyenek duplikált elemek.

        const card = document.createElement('div');
        card.classList.add('card');

        // Kép
        const image = document.createElement('img');
        image.src = `/uploads/${data.kategoriak.kep}`;
        image.alt = data.kategoriak.nev;
        image.classList.add('card-image');
        card.appendChild(image);

        // Tartalom
        const content = document.createElement('div');
        content.classList.add('card-content');

        const title = document.createElement('h1');
        title.classList.add('card-title');
        title.textContent = data.kategoriak.nev;
        content.appendChild(title);

        // Szolgáltatások listája (rádiógombok)
        const servicesForm = document.createElement('form');
        servicesForm.id = 'services-form';

        data.szolgaltatasok.forEach(service => {
            const label = document.createElement('label');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'service';
            input.value = service.szolgaltatas_id;
            input.id = `service-${service.szolgaltatas_id}`;

            const serviceName = document.createElement('span');
            serviceName.textContent = `${service.nev} - ${service.ar} Ft`;

            label.appendChild(input);
            label.appendChild(serviceName);
            servicesForm.appendChild(label);
            servicesForm.appendChild(document.createElement('br'));
        });

        content.appendChild(servicesForm);
        card.appendChild(content);

        container.appendChild(card);

    } catch (err) {
        console.error('Hiba az adatok betöltésekor:', err);
    }
}

/*// Indítás oldalbetöltéskor

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const kategoriaId = urlParams.get('kategoria_id');
    
    if (kategoriaId) {
        fetch(`/api/category/${kategoriaId}`)
            .then(response => response.json())
            .then(category => {
                // Kategória neve és képe
                const categoryTitle = document.querySelector('.category-title');
                const categoryImage = document.querySelector('.category-image');
                categoryTitle.textContent = category.nev;
                categoryImage.src = `/uploads/${category.kep}`;
                categoryImage.alt = category.nev;

                // Szolgáltatások kirajzolása rádiógombokkal
                const servicesContainer = document.querySelector('.services-container');
                category.szolgaltatasok.forEach(service => {
                    const label = document.createElement('label');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'service';
                    input.value = service.szolgaltatas_id;
                    input.id = `service-${service.szolgaltatas_id}`;

                    const serviceName = document.createElement('span');
                    serviceName.textContent = `${service.nev} - ${service.ar} Ft`;

                    label.appendChild(input);
                    label.appendChild(serviceName);
                    servicesContainer.appendChild(label);
                });
            })
            .catch(error => {
                console.error('Hiba a kategória adatainak betöltésekor:', error);
            });
    } else {
        console.error('Nincs kategória ID az URL-ben');
    }
});
*/