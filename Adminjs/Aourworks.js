const profileIcon = document.getElementsByClassName('profile-icon')[0];
const nailsLogo = document.getElementsByClassName('nailslogo')[0];

profileIcon.addEventListener('click', () => {
    window.location.href = ('./Apersonaldata.html');
});

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./Ahome.html');
});

//képek megjelenítése feltöltés után KÉSZ
document.addEventListener("DOMContentLoaded", async function () {
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");

    // Adatbázisból kép lekérése
    async function fetchImages() {
        try {
            const response = await fetch("/api/images", {
                method: 'GET',
                credentials: 'include'
            });
            const images = await response.json();

            images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = `/uploads/${image.kep}`;
                imgElement.alt = "Gallery Image";
                imgElement.loading = "lazy";
                imgElement.addEventListener("click", function () {
                    modal.style.display = "flex";
                    modalImg.src = this.src;
                });
                gallery.appendChild(imgElement);
            });
        } catch (error) {
            console.error("Hiba történt a képek lekérésekor:", error);
        }
    }

    fetchImages();

    // Modál bezárása
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});



//kattintás a képekre KÉSZ
document.addEventListener("DOMContentLoaded", function () {
    // Összes kép kiválasztása a .gallery div-en belül
    const images = document.querySelectorAll(".gallery img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            this.classList.toggle("clicked");
        });
    });
});



//kattintásra hogy jelenjen meg
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery img"); // Összes kép kiválasztása
    const overlay = document.getElementById("fullscreenOverlay"); // Fekete háttér
    const fullscreenImage = document.getElementById("fullscreenImage"); // Nagyított kép helye

    images.forEach(img => {
        img.addEventListener("click", function () {
            fullscreenImage.src = this.src; // Beállítja a kattintott kép forrását
            overlay.classList.add("active"); // Megjeleníti az overlayt
        });
    });

    // Második kattintásra eltünteti a nagyított képet
    overlay.addEventListener("click", function () {
        overlay.classList.remove("active");
    });
});



//admin