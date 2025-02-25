const calendar = document.getElementById('calendar');
const timeslots = document.getElementById('timeslots');

const dates = ['2025-02-21', '2025-02-22', '2025-02-23','2025-02-24','2025-02-25','2025-02-26','2025-02-27','2025-02-28','2025-02-29'];
const slots = ['16:30', '17:00', '17:30', '18:00'];

let bookings = {}; // Tárolja a foglalásokat

function renderCalendar() {
    calendar.innerHTML = '';
    dates.forEach(date => {
        const btn = document.createElement('button');
        btn.textContent = date;
        btn.onclick = () => renderTimeslots(date);
        calendar.appendChild(btn);
    });
}

function renderTimeslots(date) {
    timeslots.innerHTML = `<h2>${date}</h2>`;
    slots.forEach(time => {
        const btn = document.createElement('button');
        btn.textContent = time;
        if (bookings[`${date}-${time}`]) {
            btn.classList.add('booked');
            btn.disabled = true;
        } else {
            btn.onclick = () => bookSlot(date, time);
        }
        timeslots.appendChild(btn);
    });
}

function bookSlot(date, time) {
    const key = `${date}-${time}`;
    bookings[key] = true;
    renderTimeslots(date);
    renderCalendar();
}

renderCalendar();
