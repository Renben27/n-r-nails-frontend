const servicesbutton = document.getElementById('services');
const workbutton = document.getElementById('works');
const aboutusbutton = document.getElementById('aboutus');
const contactbutton = document.getElementById('contact');
const profileIcon = document.getElementsByClassName('profile-icon')[0];
const iconDate = document.getElementsByClassName('fixed')[0];


servicesbutton.addEventListener('click', () => {
    window.location.href = './services.html';
});

workbutton.addEventListener('click', () => {
    window.location.href = './ourworks.html';
});

aboutusbutton.addEventListener('click', () => {
    window.location.href = ('./aboutus.html');
});

contactbutton.addEventListener('click', () => {
    window.location.href = ('./contact.html');
});

profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

iconDate.addEventListener('click', () => {
    window.location.href = './services.html';
});