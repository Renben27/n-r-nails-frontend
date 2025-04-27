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


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/categories-with-services')
      .then(response => response.json())
      .then(categories => {
        const cardsContainer = document.querySelector('.cards-container');
  
        categories.forEach(category => {
          const card = document.createElement('div');
          card.classList.add('card');
  
          const image = document.createElement('img');
          image.src = `/uploads/${category.kep}`;
          image.alt = category.nev;
          image.classList.add('card-image');
  
          const content = document.createElement('div');
          content.classList.add('card-content');
  
          const title = document.createElement('h1');
          title.classList.add('card-title');
          title.textContent = category.nev;
  
          // Ide jönnek a szolgáltatások
          category.szolgaltatasok.forEach(service => {
            const p = document.createElement('p');
            p.textContent = `${service.nev}: ${service.ar}`;
            content.appendChild(p);
          });
  
          const button = document.createElement('button');
          button.id = `category-${category.kategoria_id}`;
          button.classList.add(`services-button`);
          button.textContent = 'Időpont foglalás';
  
          button.addEventListener('click', () => {
            window.location.href = `/services${category.kategoria_id}.html?kategoria_id=${category.kategoria_id}`;
          });
  
          content.appendChild(button);
  
          card.appendChild(image);
          card.appendChild(content);
  
          cardsContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Hiba a kategóriák betöltésekor:', error);
      });
  });
  