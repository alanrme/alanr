function isInViewport(node, excludeTop = false) {
    var rect = node.getBoundingClientRect()
    // excludeTop bypasses the check if the element is above the top of the viewport
    return (
        (rect.height > 0 || rect.width > 0) &&
        (excludeTop || rect.bottom >= 0) &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

window.setInterval(function(){
    _(".aos", true).forEach(element => {
        if(isInViewport(element, true)) {
            delay = element.getAttribute("aos-delay");
            if(delay) element.style.transitionDelay = `0.${delay}s`
            element.classList.remove("aos-deanimate")
        } else if (!element.classList.contains("aos-deanimate")) {
            element.classList.add("aos-deanimate");
        }
    })
}, 250)