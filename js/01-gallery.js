import { galleryItems } from "./gallery-items.js";
// Change code below this line

const containerGallery = document.querySelector(".gallery");
const itemsMarkup = createGalleryItems(galleryItems);

containerGallery.insertAdjacentHTML("beforeend", itemsMarkup);
containerGallery.addEventListener("click", onContainerGalleryClick);

function createGalleryItems(galleryItems) {
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

function onContainerGalleryClick(event) {
  event.preventDefault();
  const isItemLink = event.target.classList.contains("gallery__image");

  if (!isItemLink) {
    return;
  }

  const onCloseModal = (event) => {
    const ESC_KEY = "Escape";

    if (event.code === ESC_KEY) {
      instance.close();
    }
  };

  const instance = basicLightbox.create(
    `
      <img src="${event.target.dataset.source}" width="1240" height="800">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onCloseModal);
      },

      onClose: (instance) => {
        window.removeEventListener("keydown", onCloseModal);
      },
    }
  );
  instance.show();
}
