// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов;
// при отправке форм;
// обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

import "../pages/index.css";
import { buildCard, cardRemove, cardLike } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

// вывод карточек
const placesList = document.querySelector(".places__list");

// edit модальное окно
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// + модальное окно
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addPlaceForm = document.forms["new-place"];

// анимация всех Popup
const allPopup = document.querySelectorAll(".popup");
allPopup.forEach((evt) => {
  evt.classList.add("popup_is-animated");
});

// вывод карточек
initialCards.forEach(function (dataCards) {
  placesList.append(buildCard(dataCards, cardRemove, cardLike, openModal));
});

// edit модальное окно
editButton.addEventListener("click", function () {
  openModal(editPopup);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  formElement.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}

// + модальное окно
newCardButton.addEventListener("click", function (evt) {
  openModal(newCardPopup);
  addPlaceForm.addEventListener("submit", addPlaceSubmit);
  addPlaceForm.reset();
});

function addPlaceSubmit(evt) {
  evt.preventDefault();

  const placeNameInput = document.querySelector(".popup__input_type_card-name",).value;
  const imgLinkInput = document.querySelector(".popup__input_type_url").value;

  const newCard = buildCard(
    { name: placeNameInput, link: imgLinkInput }, cardRemove, cardLike, openModal,);

  placesList.prepend(newCard);
  closeModal(newCardPopup);
}
