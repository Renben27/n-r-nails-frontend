const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const booking = document.getElementById('pedikur-button');

profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('../home.html');
});

booking.addEventListener('click', () => {
    window.location.href = ('../idofogpedikur.html');
});