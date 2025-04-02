
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

    //lefoglalás elküldése, feljövő ablak//
    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedDate = appointmentDate.value;
        const selectedTime = document.getElementById("appointment-time").value;
      if (res.ok) {
        
      }
        alert(`Sikeres foglalás! ${selectedDate}  ${selectedTime}`);
        bookingForm.style.display = "none";
    });

    renderCalendar();
});
/*
Swal.fire({
    title: "Custom width, padding, color, background.",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `
  });*/