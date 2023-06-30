projects = _(".gh-projects");
var msnry = new Masonry(".gh-projects", { "percentPosition": true });

function createCard(title, text, href, stars=-1) {
    template = _("#portfolio template")
    clone = template.content.cloneNode(1).firstElementChild
    clone.href = href

    title = document.createTextNode(title)
    clone.querySelector("h3").appendChild(title)
    text = document.createTextNode(text)
    clone.querySelector("p2").appendChild(text)

    if (stars == -1) {
        clone.querySelector("div.stars").remove()
    } else {
        stars = document.createTextNode(stars)
        clone.querySelector("div.stars").appendChild(stars)
    }

    return clone
}

fetch("https://api.github.com/search/repositories?q=user:XilogOfficial&sort=stars&order=desc")
.then((resp) => resp.json())
.then(function(data) {
    for (var i = 0; i < 6; i++) {
        item = data.items[i]

        card = createCard(item.name, item.description, item.html_url, item.stargazers_count)
        projects.appendChild(card)
    }
    
    msnry.reloadItems()
    msnry.layout()
    // Array.from() converts the HTMLCollection to an array
    Array.from(projects.children).forEach(e => addHaptics(e))
})
.catch(function(error) {
    console.log(error);

    card = createCard("Hmm...", "I can't seem to be able to access GitHub. Something in your network may be blocking it.")
    projects.appendChild(card)
});