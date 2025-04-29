document.addEventListener("DOMContentLoaded", () => {
    const calendarBody = document.getElementById("calendar-body");
    const monthYear = document.getElementById("month-year");
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month");
    const appointmentDate = document.getElementById("appointment-date");
    const appointmentForm = document.getElementById("appointment-form");
    const bookingForm = document.querySelector(".booking-form");

    let currentDate = new Date();

    //naptár megjelenítése, napok kiválasztása//
    function renderCalendar() {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${currentYear}`;
        calendarBody.innerHTML = "";

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");

                if ((i === 0 && j < firstDayOfMonth) || date > daysInMonth) {
                    cell.textContent = "";
                } else {
                    cell.textContent = date;

                    // Esemény hozzáadása a dátum cellához
                    cell.addEventListener("click", ((selectedDate) => {
                        return () => {
                            bookingForm.style.display = "flex";
                            appointmentDate.value = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
                        };
                    })(date)); // IIFE használata a dátum megőrzésére

                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    };

    // Lefoglalás elküldése, feljövő ablak//
    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Feltételezem, hogy van egy appointmentForm nevű formod
    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Megakadályozza az alapértelmezett küldést

        // Kiválasztott dátum és idő
        const selectedDate = appointmentDate.value;
        const selectedTime = document.getElementById("appointment-time").value;

        // Kiválasztott szolgáltatás (radio gombból)
        const selectedServiceInput = document.querySelector('input[name="service"]:checked');

        if (!selectedServiceInput) {
            // Ha nincs kiválasztva szolgáltatás, figyelmeztetés
            Swal.fire({
                title: 'Hiányzó szolgáltatás!',
                text: 'Kérlek válassz egy szolgáltatást a foglaláshoz.',
                icon: 'warning',
                confirmButtonText: 'Rendben'
            });
            return; // Leállítjuk a foglalást
        }

        const selectedServiceId = selectedServiceInput.value; // Ezt az ID-t küldjük

        // Foglalási adatok összeállítása
        const bookingData = {
            datum: `${selectedDate} ${selectedTime}`,
            szolgaltatas_id: selectedServiceId
        };

        // Küldés a backendre
        fetch('/api/booking', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    // Ha a válasz sikeres, jelenjen meg a sikeres foglalás üzenet
                    Swal.fire({
                        title: 'Sikeres foglalás!',
                        text: `Időpont: ${selectedDate} ${selectedTime}`,
                        icon: 'success',
                        confirmButtonText: 'Rendben',
                        width: 600,
                        padding: '3em',
                        color: '#716add',
                        background: '#886383', // Tetszés szerint cserélheted
                        backdrop: `
                            rgba(0,0,123,0.4)
                            url("images/nyan-cat.gif")
                            left top
                            no-repeat
                        `
                    }).then(() => {
                        // Ha a felhasználó rákattint a "Rendben"-ra, zárd be a foglalási formot
                        bookingForm.style.display = "none";
                    });
                } else {
                    // Ha a válasz nem sikeres, jelenjen meg a hibaüzenet
                    Swal.fire({
                        title: 'Hiba történt!',
                        text: 'A foglalás nem sikerült.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            })
            .catch(error => {
                console.error('Foglalási hiba:', error);
                Swal.fire({
                    title: 'Hiba!',
                    text: 'Nem sikerült a foglalás, próbáld újra.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    });
});