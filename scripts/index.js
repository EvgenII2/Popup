"use strict";

const action = document.querySelector(".action");
const templateImageCard = document.querySelector("#image");
const templateImagePopup = document.querySelector("#popup-image");
const container = document.querySelector(".images");

const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup .content");
const popupClose = document.querySelector(".popup .action");
const loader = document.querySelector(".loader");

const MAX_PAGE_IAMGES = 34;
let loaderTimeout;


const showLoader = function () {
    loader.style.visibility = 'visible';
}

const hideLoader = function () {
    loaderTimeout = setTimeout(function () {
        loader.style.visibility = 'hidden';
        loaderTimeout.clearTimeout();
    }, 7000);
}

showLoader();
hideLoader();