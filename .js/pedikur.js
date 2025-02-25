const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const profileIcon=document.getElementById('profile-icon')[0];
const backArrow=document.getElementById('arrow-left');

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});

profileIcon.addEventListener('click'), ()=>{
    window.location.href=('./personaldata.html');
};

backArrow.addEventListener('click'), ()=>{
    window.location.href=('./services.html')
};