"use strict";

const buttonLoad = document.querySelector(".button-load");
const container = document.querySelector(".images-container");
const templateImageCard = document.querySelector(".image-card");
const templateImagePopup = document.querySelector(".image-popup");

const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__content");
const buttonClosePopup = document.querySelector(".popup__button-close");

const loader = document.querySelector(".loader");

const MAX_NUMBER_OF_PAGE = 10;

const initialState = () => {
  buttonLoad.disabled = false;
  getPictures();
};

const getPictures = (page = 1, limit = 10) => {
  showLoader();
  fetch(`https://picsum.photos/v2/list?page=${page};limit=${limit}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      renderPictures(result);
    });
};

const renderPictures = function (list) {
  if (!list.length) {
    throw Error(`Pictures not defined.`);
  }

  const fragment = document.createDocumentFragment();

  list.forEach((element) => {
    const clone = templateImageCard.content.cloneNode(true);
    const link = clone.querySelector(".image-card__link");

    link.href = element.url;
    link.dataset.id = element.id;

    const image = clone.querySelector(".image-card__image");
    image.src = cropImage(element.download_url, 5);
    image.alt = element.author;
    image.classList.add("preview");
    console.log();
    fragment.appendChild(clone);
  });

  container.appendChild(fragment);
  hideLoader();
};

const cropImage = (src, size = 2) => {
  const [domain, key, id, width, height] = src.split("/").splice(2);
  const newWidth = Math.floor(+width / size);
  const newHeight = Math.floor(+height / size);

  return `https://${domain}/${key}/${id}/${newWidth}/${newHeight}`;
};

const showLoader = () => {
  loader.style.visibility = "visible";
};

const hideLoader = () => {
  setTimeout(() => {
    loader.style.visibility = "hidden";
  }, 500);
};

const onButtonLoadClick = (evt) => {
  evt.preventDefault();
  const nextPage = evt.currentTarget.dataset.page;
  evt.currentTarget.dataset.page = +nextPage + 1;

  if (nextPage > MAX_NUMBER_OF_PAGE) {
    console.warn(
      `WARN: You are trying to call a page that exceeds ${MAX_NUMBER_OF_PAGE}`
    );
    evt.currentTarget.disabled = true;
  } else {
    getPictures(nextPage);
  }
};

const onButtonClosePopupClick = function () {
  togglePopup();
};

const onImageClick = (evt) => {
  evt.preventDefault();

  const parentOfTarget = evt.target.closest(".image-card__link");
  if (parentOfTarget) {
    getPictureInfo(parentOfTarget.dataset.id);
  }
};

const getPictureInfo = (id = 0) => {
  showLoader();
  fetch(`https://picsum.photos/id/${id}/info`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      renderPopupPicture(result);
    });
};

const renderPopupPicture = (picture) => {
  const clone = templateImagePopup.content.cloneNode(true);
  console.log(clone)
  const img = clone.querySelector(".image-popup__image");
  const link = clone.querySelector(".image-popup__link");
  const author = clone.querySelector(".image-popup__author");

  img.src = cropImage(picture.download_url, 2);
  img.alt = picture.author;
  author.textContent = picture.author;
  img.width = picture.width / 10;
  link.href = picture.download_url;

  popupContainer.innerHTML = "";
  popupContainer.appendChild(clone);
  hideLoader();
  togglePopup();
};

const togglePopup = () => {
  popup.classList.toggle("popup_open");
};

buttonLoad.addEventListener("click", onButtonLoadClick);
container.addEventListener("click", onImageClick);
buttonClosePopup.addEventListener("click", onButtonClosePopupClick);

initialState();
