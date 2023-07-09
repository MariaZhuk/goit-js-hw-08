// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryListEl = document.querySelector('.gallery');
const CardsMarkUp = createImgEl(galleryItems);


function createImgEl(galleryItems) { // функція створення елементів галереї із масива обєктів за вказанною розміткою

    return galleryItems
        .map(({ original, preview, description }) => {
       

    return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
            </li>`}).join(" "); 
}

galleryListEl.insertAdjacentHTML('beforeend', CardsMarkUp) // вставили в html

var lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250}); //створення галереї з додатковими умовами

console.log(galleryItems);