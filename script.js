const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//  Unsplash API
let count = 5;
const _apiKey = '0SfSHULteHUB2zuBvkNVyIZabgJbdxCrUHFaE2TzG00';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${_apiKey}&count=${count}`;

//  Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${_apiKey}&count=${count}`;
    }
}

//  Helper Function to Set Attribute on DOM element
function setAttributes(element, attributes) {
    for( const key in attributes ) {
        element.setAttribute(key, attributes[key]);
    }
}

//  Create Elements For Links & Photos, Add to DOM
const displayPhotos = function() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function for each object in photosArray
    photosArray.forEach(photo => {
        //  Create <a></a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //  Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //  Event Listeners, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //  Put <img> inside <a></a>, then both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    }); 
}


// Get photos from Unsplash API
const getPhotos = async function() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        // Catch Error
        console.error(`🎇${err}`);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos()