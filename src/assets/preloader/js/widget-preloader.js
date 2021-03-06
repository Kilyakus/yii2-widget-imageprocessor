var list = document.querySelectorAll('[data-image]');
for (var i = 0; i < list.length; i++) {
    var el = list[i],
        url = el.getAttribute('data-image');
    if (el.tagName != 'BODY') {
        $(el).addClass('preload')
    };
    jQuery(window).bind('load', function() {
        if (getImage(url)) {
            preload(el, url)
        }
    })
};

function preload(el, url) {
    el.style.backgroundImage = 'url(\"' + url + '\"),' + el.style.backgroundImage;
    if (el.tagName != 'BODY') {
        $(el).removeClass('preload')
    };
    $(el).removeAttr('data-image')
}

function getImage(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() {
            resolve(url)
        };
        img.onerror = function() {
            reject(url)
        };
        img.src = url
    })
}

setTimeout(function() {
    for (var i = 0; i < list.length; i++) {
        var el = list[i],
            url = el.getAttribute('data-image');
        if (preload(el, url)) {
            console.log($(el))
        }
    }
}, 3500)