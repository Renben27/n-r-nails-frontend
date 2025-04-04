const servicesbutton = document.getElementById('services');
const workbutton = document.getElementById('works');
const aboutusbutton = document.getElementById('aboutus');
const contactbutton = document.getElementById('contact');
const profileIcon = document.getElementsByClassName('profile-icon')[0];
const iconDate = document.getElementsByClassName('fixed')[0];


servicesbutton.addEventListener('click', () => {
    window.location.href = './services.html';
});;

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



const wrapper = document.querySelector(".reviews-wrapper");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let scrollAmount = 0;
const scrollStep = 260; // Egy elem szélessége + gap
const autoScrollInterval = 7000; // 3 másodpercenként mozog
let autoScroll;

// Automatikus görgetés indítása
function startAutoScroll() {
    autoScroll = setInterval(() => {
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        if (scrollAmount >= maxScroll) {
            scrollAmount = 0; // Visszaugrik az elejére
        } else {
            scrollAmount += scrollStep;
        }
        wrapper.style.transform = `translateX(-${scrollAmount}px)`;
    }, autoScrollInterval);
}

// Automatikus görgetés leállítása (ha a felhasználó kattint)
function stopAutoScroll() {
    clearInterval(autoScroll);
    setTimeout(startAutoScroll, 500); //.... múlva újraindul
}

// Manuális léptetés
nextBtn.addEventListener("click", () => {
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    if (scrollAmount < maxScroll) {
        scrollAmount += scrollStep;
        wrapper.style.transform = `translateX(-${scrollAmount}px)`;
    }
    stopAutoScroll();
});

prevBtn.addEventListener("click", () => {
    if (scrollAmount > 0) {
        scrollAmount -= scrollStep;
        wrapper.style.transform = `translateX(-${scrollAmount}px)`;
    }
    stopAutoScroll();
});

// Indítás oldalbetöltéskor
startAutoScroll();

