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

booking.addEventListener('click', () => {
    window.location.href = ('../services1.html');
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
//admin