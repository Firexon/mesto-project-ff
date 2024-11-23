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

const placeNameInput = document.querySelector(".popup__input_type_card-name");
const imgLinkInput = document.querySelector(".popup__input_type_url");

// img модальное окно
const cardImagePopup = document.querySelector(".popup_type_image");
const ImageInsidePopup = cardImagePopup.querySelector(".popup__image");
const popupCaption = cardImagePopup.querySelector(".popup__caption");

// анимация всех Popup + закрытие по оверлею
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });
});

// закрытие Popup по крестику
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest(".popup")));
});

// вывод карточек
initialCards.forEach(function (dataCards) {
  placesList.append(buildCard(dataCards, cardRemove, cardLike, imageClickHandler));
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

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}

// + модальное окно
addPlaceForm.addEventListener("submit", addPlaceSubmit);

newCardButton.addEventListener("click", function (evt) {
  openModal(newCardPopup);
  addPlaceForm.reset();
});

function addPlaceSubmit(evt) {
  evt.preventDefault();

  const newCard = buildCard(
    { name: placeNameInput.value, link: imgLinkInput.value }, cardRemove, cardLike, imageClickHandler);

  placesList.prepend(newCard);
  closeModal(newCardPopup);
}

// img модальное окно 
function imageClickHandler(link, name) {
  ImageInsidePopup.src = link;
  ImageInsidePopup.alt = "Фотография " + name;
  popupCaption.textContent = name;
  openModal(cardImagePopup);
} 

