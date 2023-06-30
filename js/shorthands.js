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