const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const booking = document.getElementById('pedikur-button');
const booking2 = document.getElementById('gellak-button');
const booking3 = document.getElementById('extram-button');
const booking4 = document.getElementById('mbuild-button');
const booking5 = document.getElementById('specials-button');
const booking6 = document.getElementById('weddingm-button');

profileIcon.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Apersonaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./Adminhtml/Ahome.html');
});

booking.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices1.html');
});

booking2.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices2.html');
});

booking3.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices3.html');
});

booking4.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices4.html');
});

booking5.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices5.html');
});

booking6.addEventListener('click', () => {
    window.location.href = ('../Adminhtml/Aservices6.html');
});
//admin