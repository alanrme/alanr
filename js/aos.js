window.setInterval(function(){
    _(".aos", true).forEach(element => {
        if(isInViewport(element, true)) {
            delay = element.getAttribute("aos-delay");
            if(delay) element.style.transitionDelay = `0.${delay}s`
            element.classList.remove("aos-deanimate")
        } else {
            element.classList.add("aos-deanimate");
        }
    })
}, 150)