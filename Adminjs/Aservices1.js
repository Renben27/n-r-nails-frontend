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
//admin