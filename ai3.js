const calendar = document.getElementById('calendar');
const timeslots = document.getElementById('timeslots');
const errorDiv = document.getElementById('error');

const apiUrl = 'http://127.0.0.1:3000/api/booking';
const dates = ['2025-02-21', '2025-02-22', '2025-02-23'];
const slots = ['16:30', '17:00', '17:30', '18:00'];
let bookings = {}; // Tárolja a foglalásokat

async function fetchBookings() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Sikertelen lekérés');
        bookings = await response.json();
        renderCalendar();
    } catch (error) {
        showError(error.message);
    }
}

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
        const key = `${date}-${time}`;
        if (bookings[key]) {
            btn.classList.add('booked');
            btn.disabled = true;
        } else {
            btn.onclick = () => bookSlot(date, time);
        }
        timeslots.appendChild(btn);
    });
}

async function bookSlot(date, time) {
    const key = `${date}-${time}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time })
        });
        if (!response.ok) throw new Error('Sikertelen foglalás');
        bookings[key] = true;
        renderTimeslots(date);
        renderCalendar();
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 3000);
}

// Periodikus frissítés 5 másodpercenként
setInterval(fetchBookings, 5000);

fetchBookings();