// Haptics to click while the 404 page shakes
vibrate = () => { navigator.vibrate([5,100,5,100,3,100,2,100,1]) };

// on page load
ready(() => {
    vibrate();
});

div = _("div.shake");
["click"].forEach(event => {
    div.addEventListener(event, () => {
        div.classList.remove("shake");

        // needs a delay because otherwise Firefox doesn't repeat the animation
        window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                div.classList.add("shake");
                vibrate();
            });
        },1);
    });
});