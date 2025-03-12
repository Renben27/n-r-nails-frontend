const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];
const iconDate = document.getElementsByClassName('fixed')[0];

profileIcon.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});

iconDate.addEventListener('click', () => {
    window.location.href = './services.html';
});



const wrapper = document.querySelector(".reviews-wrapper");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let scrollAmount = 0;
const scrollStep = 260; // Egy elem szélessége + gap
const autoScrollInterval = 3000; // 3 másodpercenként mozog
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
    setTimeout(startAutoScroll, 5000); // 5 másodperc múlva újraindul
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