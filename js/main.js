// LOADER HIDE
hero = _(".hero")
hero.classList.add("loader")
addEventListener("DOMContentLoaded", () => {
    hero = _(".hero")
    hero.classList.add("loader")
});

//window.onload = () => {}

ready(() => {
    setTimeout(() => {
        text = _("#alan")
        textclone = _("#alan2")
        line = _("#line")
        const rect = text.getBoundingClientRect();
        const rectclone = textclone.getBoundingClientRect();
        text.style.opacity = 1
        line.style.opacity = 0
        _("#loader").style.display = "block"
        text.style.transform = `translate(${rectclone.left-rect.left}px,${rectclone.top-rect.top}px)`
    }, 20)
    setTimeout(() => {
        loadBg = _("#loader")
        text.classList.add("animated")
        _(".hero .section p, h1:not(#alan)", true).forEach(e => e.classList.add("animated"))
        hero.classList.remove("loader")
        loadBg.classList.add("hide")
        textclone.remove()
        line.remove()
        text.style.transform = `translate(0,0)`
        loadBg.addEventListener("transitionend", () => {
            loadBg.style.display = 'none'
        })
    }, 400)


    window.scrollTo(0, 0); // scroll to top on page load
    
    // set vh property to the true viewport height to fix it on mobile browsers
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    
    
    // DISABLE RIGHT CLICK
    noRightClick = _(".norightclick", true)
    for (var i = 0; i < noRightClick.length; i++) {
        noRightClick[i].addEventListener('contextmenu', event => event.preventDefault());
    }

    // check browser theme preference on site load and listen to changes
    // set website to dark if browser prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add("dark")
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches)
            document.body.classList.add("dark")
        else
            document.body.classList.remove("dark")
    });
    
    
    
    
    // see if the browser supports passive listeners for some events - improves performance
    // test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) {}


    // Haptics when link/button is pressed or released
    // I define a function to add a listener so that my other
    // scripts can call it when they dynamically add elements
    addHaptics = (element) => {
        // array contains all types of event listeners I want to attach haptics to
        ["touchstart", "touchend"].forEach(event => {
            // stuff at the end is to specify the event
            // listener is passive for browsers that support it
            element.addEventListener(event, () => navigator.vibrate(5), supportsPassive ? { passive: true } : false);
        });
    }
    _("button, a, nav .menu", true).forEach(e => addHaptics(e));
    
    
    
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
    
    
    // Checking if element is in viewport (used for parallax scroll)
    function isInViewport(node) {
        var rect = node.getBoundingClientRect()
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
            )
    }
    
    
    // SCROLL POSITION
    let scrollpos = 0
    document.addEventListener('scroll', () => {
        scrollpos = window.scrollY
    });
    
    
    
    let intro = _('.content').offsetTop // top of content
    let nav = _('nav')
    let checkpointContainer = _('.checkpoint-container')
    let circles = checkpointContainer.querySelectorAll(".circle")
    let sections = _(".section", true)
    let scrollup = _('.scrollup')
    // run every 150ms, put most things-that-change-with-scrolling here.
    // more efficient than putting them in the scroll event
    window.setInterval(function(){
        intro = _('.content').offsetTop; // set top of content
        // ^ this is in a loop so that if the screen is turned it
        // will update with new values
        
        // if user scrolls below intro, show button
        if (scrollpos > intro) {
            scrollup.classList.add("show")
        } else {
            scrollup.classList.remove("show")
        }
        
        if (scrollpos > 20) {
            if (hero.classList.contains("unscrolled")) {
                hero.classList.remove("unscrolled")
                navigator.vibrate(2)
            }
        } else {
            if (!hero.classList.contains("unscrolled")) {
                hero.classList.add("unscrolled")
                navigator.vibrate(2)
            }
        }

        // FIXED NAV
        // handles attaching nav to screen when scrolled far enough
        if (scrollpos > 200) { // after the nav is no longer visible
            if (!nav.classList.contains('scrolled')) nav.classList.add('scrolled');
        } else {
            if (nav.classList.contains('scrolled')) nav.classList.remove("scrolled");
        }

        updateCheckpoints(checkpointContainer)
    }, 150);

    function updateCheckpoints(container) {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        // width to set the scroll progress bar to
        let newWidth = 0;
        // how much to increment the progress bar to get to the next circle
        // i.e. if there are three circles, this is 50% as the bar's width
        // must increase by 50% to get from the first to second circle, etc
        const increment = 100/(circles.length-1)
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect()
            if (rect.top < vh) {
                /*
                rect.bottom-rect.top used instead of rect.height as rect.height
                is not supported in older browsers
                Math.min used to cap newWidth at 100%
                */
                newWidth = Math.min(increment*(i + (vh - rect.top) / (rect.bottom - rect.top)), 100)
            }
        })
        container.querySelector("#checkpoint-fill").style.width = `${newWidth}%`
        const circlesToFill = Math.floor((newWidth+1)/increment)
        circles.forEach((circle, i) => {
            if (i<=circlesToFill) circle.classList.add("active")
            else circle.classList.remove("active")
        })
    }
});