import { galleryItems } from "./gallery-items.js";

const containerGallery = document.querySelector(".gallery");
const itemsMarkup = createGalleryItemsMarkup(galleryItems);

containerGallery.insertAdjacentHTML("beforeend", itemsMarkup);

initLightbox();

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
              width="400"
              height="300"
              title="${description}"
            />
          </a>
        </li>
      `;
    })
    .join("");
}

function initLightbox() {
  const lightbox = new SimpleLightbox(".gallery a", {
    captionDelay: 250,
    captionsData: "title",
    scrollZoom: false,
  });
}
