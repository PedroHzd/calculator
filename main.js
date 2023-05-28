
window.addEventListener('keydown', (e) => {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if(button === null) return;
    button.classList.add("activate");
});

window.addEventListener('keyup', (e) => {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if(button === null) return;
    button.classList.remove("activate");
});

