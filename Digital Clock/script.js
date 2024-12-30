function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString( 'en-US', { hour:"2-digit", minute:"2-digit", second:"2-digit"})
    const date = now.toLocaleDateString( undefined, {
        day: 'numeric',
        month: 'long',
        year:"numeric",
    })

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;

}

setInterval(updateTime, 1000);
updateTime();