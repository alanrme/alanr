---
---

projects = _(".gh-projects");
var msnry = new Masonry(".gh-projects", { "percentPosition": true });

const skillType = [
    "javascript-plain", //0
    "css3-plain",
    "html5-plain", //2
    "nodejs-plain",
    "tensorflow-original", //4
    "python-plain",
    "go-plain", //6
    "postgresql-plain",
    "bash-plain", //8
    "svelte-plain",
    "tailwindcss-original", //10
    "electron-original",
    "flutter-plain" //12
]

const repoSkills = {
    "alanr": [0,1,2],
    "xilog": [0,1,2],
    "toxicitybot": [3,4,7],
    "go-notes": [6],
    "type": [0,1,2],
    "nproxy": [3,7],
    "telegramprocessor": [3],
    "discordprocessor": [3],
    "ds4led": [5,8],
    "go-clock": [6],
    "calcutyper": [2,9,10],
    "library-exif-analyzer": [3,11]
}

function createCard(title, text, href, stars=-1) {
    template = _("#portfolio template")
    clone = template.content.cloneNode(1).firstElementChild
    clone.href = href

    // keeping this above "title" variable re-definition
    skills = repoSkills[title]

    title = document.createTextNode(title)
    clone.querySelector("h3").appendChild(title)
    text = document.createTextNode(text)
    clone.querySelector("p2").appendChild(text)

    if (skills) {
        skills.forEach((e) => {
            icon = document.createElement("i")
            icon.classList.add(`devicon-${skillType[e]}`)
            clone.querySelector("span.skills").appendChild(icon)
        })
    } else {
        clone.querySelector("span.skills").remove()
        clone.querySelector("div.vr").remove()
    }
    if (stars == -1) {
        clone.querySelector("span.stars").remove()
        clone.querySelector("span.action-label").innerText = "GitHub"
    } else {
        stars = document.createTextNode(stars)
        clone.querySelector("span.stars").appendChild(stars)
    }

    return clone
}

projects.querySelector("#nojs").remove()

fetch("https://api.github.com/search/repositories?q=user:{{ site.github_username }}&sort=stars&order=desc")
.then((resp) => resp.json())
.then((data) => {
    for (var i = 0; i < 6; i++) {
        item = data.items[i]
        if (item.private) return
        card = createCard(item.name, item.description, item.html_url, item.stargazers_count)
        projects.appendChild(card)
    }
    card = createCard("More...", "These projects are pulled from my GitHub. Click to browse my other projects!", "https://github.com/{{ site.github_username }}?tab=repositories")
    projects.appendChild(card)

    msnry.reloadItems()
    msnry.layout()
})
.catch(function(error) {
    console.error(error);

    card = createCard("Click to visit my GitHub!", "Sorry! I ran into an error accessing GitHub to load these projects. Your network may be blocking it.", "https://github.com/{{ site.github_username }}")
    projects.appendChild(card)
})
.then(() => {
    // Array.from() converts the HTMLCollection to an array
    Array.from(projects.children).forEach(e => addHaptics(e))
})