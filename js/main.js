// Enable loader
hero = _(".hero")
hero.classList.add("loader")
addEventListener("DOMContentLoaded", () => {
    hero = _(".hero")
    hero.classList.add("loader")
});

//window.onload = () => {}

ready(() => {
    // Loader fading out animation
    // Small delay so it works on Firefox
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
    /*
    noRightClick = _(".norightclick", true)
    for (var i = 0; i < noRightClick.length; i++) {
        noRightClick[i].addEventListener('contextmenu', event => event.preventDefault());
    }
    */

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
    // define a function to add a listener so that the other
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
    
    
    
    let intro = _('.content').offsetTop // top of content
    let nav = _('nav')
    let scrollup = _('.scrollup')

    let checkpointProgress = _(".checkpoint-container #checkpoint-fill")
    let circles = _(".checkpoint-container .circle", true)
    let sections = _(".section", true)
    // how much to increment the progress bar to get to the next circle
    // i.e. if there are three circles, this is 50% as the bar's width
    // must increase by 50% to get from the first to second circle, etc
    const increment = 100/(circles.length-1)

    let headerYOffset = (window.innerHeight)/10 - parseFloat(getComputedStyle(_("h2")).fontSize) - 5

    // Current scroll position
    let scrollPos = 0

    // fire when window resized, e.g. when device is turned
    window.addEventListener('resize', function(event) {
        intro = _('.content').offsetTop; // set top of content
        
        headerYOffset = (window.innerHeight)/10 - parseFloat(getComputedStyle(_("h2")).fontSize) - 5
        updateHeaders()
    }, true);

    document.addEventListener('scroll', () => {
        // Update scroll position on scroll
        scrollPos = window.scrollY

        updateHeaders()
    })

    function updateHeaders() {
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect()
            
            // only bother doing these transformations if the section is actually on screen
            // i.e. the section bottom is lower than the top of the screen
            if (rect.bottom > 0) {
                // look for header that has already been activated with class sticky
                header = section.querySelector("h2.stickyheader.sticky")
                if (header) {
                    header.style.transform = `scale(10) translate(${(rect.top) / (rect.bottom - rect.top)*70}%, ${headerYOffset}px)`
                }
            }
        })
    }
    
    // run every 150ms, put most things-that-change-with-scrolling here.
    // more efficient than putting them in the scroll event
    window.setInterval(function(){
        // if user scrolls below hero, show scroll up button
        if (scrollPos > intro) {
            scrollup.classList.add("show")
        } else {
            scrollup.classList.remove("show")
        }
        
        if (scrollPos > 20) {
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
        if (scrollPos > 200) { // after the nav is no longer visible
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove("scrolled");
        }

        sectionActions()
    }, 150);

    function sectionActions() {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        // width to set the scroll progress bar to
        let newWidth = 0;

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect()
            // if this section's top is above the screen bottom
            if (rect.top < vh) {
                /*
                rect.bottom-rect.top used instead of rect.height as rect.height
                is not supported in older browsers
                Math.min used to cap newWidth at 100%
                */
                newWidth = Math.min(increment*(i + (vh - rect.top) / (rect.bottom - rect.top)), 100)
            }
            
            header = section.querySelector("h2.stickyheader")
            if (header) {
                // if the element is at the top of the screen
                if (rect.top < 0) {
                    header.classList.add("sticky")  
                    listenerF = (event) => {
                        if (event.target.classList.contains("sticky")) {
                            event.target.classList.add("active")
                        }
                        event.target.removeEventListener("transitionend", listenerF)
                    }
                    header.addEventListener("transitionend", listenerF)
                } else {
                    header.classList.remove("active")
                    header.classList.remove("sticky")
                    header.style.transform = null
                }
            }
        })
        checkpointProgress.style.width = `${newWidth}%`
        const circlesToFill = Math.floor((newWidth+1)/increment)
        circles.forEach((circle, i) => {
            if (i<=circlesToFill) circle.classList.add("active")
            else circle.classList.remove("active")
        })
    }
});