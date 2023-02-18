import { galleryItems } from "./gallery-items.js";

const containerGallery = document.querySelector(".gallery");

if (!galleryItems || !containerGallery) {
  console.error("Failed to initialize the gallery.");
}

containerGallery.addEventListener(
  "click",
  function handleGalleryItemClick(event) {
    event.preventDefault();
    const target = event.target;
    const isItemLink = target.classList.contains("gallery__image");
    if (!isItemLink) {
      return;
    }
    const originalSrc = target.dataset.source;
    const lightboxInstance = basicLightbox.create(
      `<img src="${originalSrc}" width="1240" height="800">`,
      {
        onShow: () => window.addEventListener("keydown", handleModalClose),
        onClose: () => window.removeEventListener("keydown", handleModalClose),
      }
    );
    lightboxInstance.show();

    function handleModalClose(event) {
      const ESC_KEY = "Escape";
      if (event.code === ESC_KEY) {
        lightboxInstance.close();
      }
    }
  }
);

function renderGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `;
    })
    .join("");
}

const itemsMarkup = renderGallery(galleryItems);
containerGallery.insertAdjacentHTML("beforeend", itemsMarkup);
