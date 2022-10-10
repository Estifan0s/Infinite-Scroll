const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Access Unsplash API
const apiKey = 'QYlBbIVy5bqsqO9Sakk7j4sgOHdpRejzIAt184HyL5w';
let count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes
function setAttributes(tagName, attributes) {
    for (const key in attributes) {
        tagName.setAttribute(key, attributes[key]);
    }
}

// Check if all images have loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Get pictures from api and append to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create an anchor tag
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank',
        })
        // create an image tag
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        // Check to see if all photos have loaded
        img.addEventListener('load', imageLoaded)
        // put image tage inside anchor tag
        anchor.appendChild(img);
        imageConatiner.appendChild(anchor);
    }
    )
}

// Get photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }

}

// Check to see if scrolling near the botton page so we can load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos()