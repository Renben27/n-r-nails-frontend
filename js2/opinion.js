const nailsLogo = document.getElementsByClassName('logo')[0];
const logout = document.getElementsByClassName('logout')[0];
const myData = document.getElementById('myData');
const myBooking = document.getElementById('myBooking');

nailsLogo.addEventListener('click', () => {
    window.location.href = ('./home.html');
});

myData.addEventListener('click', () => {
    window.location.href = ('./personaldata.html');
});

myBooking.addEventListener('click', () => {
    window.location.href = ('./booking.html');
});

logout.addEventListener('click', async () => {
    const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    })

    console.log(res);
    
    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        window.location.href = ('./index.html');
    } else {
        alert("hiba a kijelentkezéskor");
    }
});

