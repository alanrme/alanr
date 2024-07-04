
ready(() => {
    //MOBILE MENU
    menuBg = _('#menu-bg')
    _('.menu').addEventListener("click", () => {
        // when clicked clone all hidden navbar items to the nav menu
        navItems = _("nav a", true)
        for (var i = 0; i < navItems.length; i++) {
            if(!navItems[i].classList.contains('menu')) { // don't clone the menu button though!
                e = navItems[i].cloneNode(true);
                _('#menu').appendChild(e);
            }
        }
        
        // fade in menu - delay because if it wasn't there the opacity transition didn't work
        menuBg.style.display = "flex";
        setTimeout(() => { menuBg.style.opacity = 1; }, 2);
        
        // apply blur effect
        ["blur", "blur2"].forEach(id => {
            blurModal = _(`.modal#${id}`);
            blurModal.classList.add("show");
            blurModal.classList.add("animate");
        });
    });
    
    _('.m-close, #menu-bg', true).forEach(e => {
        func = () => {
            // hide both menuBg and blurModal
            menuBg.style.display = "none";
            ["blur", "blur2"].forEach(id => { _(`.modal#${id}`).classList.remove("show"); });
            
            // empty the menu except for close button & remove listener so it won't fire on fadein
            _("#menu a:not(.m-close)", true).forEach(e => e.remove());
            menuBg.removeEventListener('transitionend', func);
        }
        
        e.addEventListener("click", () => { // when close button clicked
            menuBg.style.opacity = 0;
            menuBg.addEventListener('transitionend', func, false);
            
            // un-animate blur effect, finish setting display: none in
            // menuBg's transitionend event
            ["blur", "blur2"].forEach(id => { _(`.modal#${id}`).classList.remove("animate"); });
        })
    })
})