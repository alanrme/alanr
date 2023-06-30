function gallery(data) {
    for (p of data.photos.photo) {
        $('#port-items').append(`
        <div class="p-item">
            <div class="img-container">
                <div class="middle">
                    <a class="button" href="https://www.flickr.com/photos/187521344@N08/${p.id}">View on Flickr</a>
                </div>
                <img src="https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_m.jpg" alt="${p.title}" class="img-responsive centered"style="display: block;">
            </div>
            <div class="p-name">${p.title}</div>
            <div class="p-desc">${p.description._content}</div>
        </div>
        `)
    }
}