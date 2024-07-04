// querySelector is much more efficient than jQuery AJAX
// this is a shorthand that makes it as easy to use
var _ = (selector, all) => {
    if (all) return document.querySelectorAll(selector);
    else return document.querySelector(selector);
};

// alternative to jQuery document ready
function ready(callback) {
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

function isInViewport(node, excludeTop = false) {
    var rect = node.getBoundingClientRect()
    // excludeTop means that this function returns true even if the element is
    // completely above the top of the screen
    return (
        (rect.height > 0 || rect.width > 0) &&
        (excludeTop || rect.bottom >= 0) &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    )
}