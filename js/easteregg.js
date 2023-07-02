function showEgg(egg) {
    //audio.play()
    egg.style.display = "block"
    setTimeout(function(){
        egg.classList.add("show")
    }, 10);
}

function hideEgg(egg) {
    egg.classList.remove("show")
    egg.addEventListener("transitionend", () => {
        // so this only fires when fading out
        if (!egg.classList.contains("show"))
            egg.style.display = "none"
    })
}

ready(() => {
    // called egg cuz I wanted an excuse to call a variable egg
    var egg = _("#easteregg")
    _("#easteregg #close", true).forEach(e => {
        e.addEventListener("click", () => { // when close button or bg clicked
            hideEgg(egg)
        })
    })

    //CLICK-TRIGGER EASTEREGG
    _("#trigger").addEventListener("click", () => { // when trigger clicked
        showEgg(egg)
    })


    //KONAMI CODE
    var konamikeys = [38,38,40,40,37,39,37,39,66,65],
    count = 0
    
    document.addEventListener('keydown', e => {
        var reset = function() {
            count = 0
        }
        
        if (konamikeys[count] == e.keyCode){
            count++
        } else {
            // incorrect key, reset
            reset()
        }

        if (count == konamikeys.length){ // full code entered
            if (egg.style.display === "none") { // if diplay none fade in easteregg
                showEgg(egg)
            } else {
                hideEgg(egg)
            }
            reset()
        }
    })
})