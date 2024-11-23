import { openModal, closeModal } from "./modal.js";

export function buildCard(dataCards, cardRemove, cardLike, openModal) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = dataCards.link;
  cardElement.querySelector(".card__image").alt =
    "Фотография " + dataCards.name;
  cardElement.querySelector(".card__title").textContent = dataCards.name;

  // удаление
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardRemove(cardElement);
  });

  // лайк
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    cardLike(likeButton);
  });

  // popup для открытия фотографий
  const cardImage = cardElement.querySelector(".card__image");
  const cardImagePopup = document.querySelector(".popup_type_image");
  const ImageInsidePopup = cardImagePopup.querySelector(".popup__image");
  const popupCaption = cardImagePopup.querySelector(".popup__caption");

  cardImage.addEventListener("click", function () {
    ImageInsidePopup.src = dataCards.link;
    ImageInsidePopup.alt = "Фотография " + dataCards.name;
    popupCaption.textContent = dataCards.name;

    openModal(cardImagePopup);
  });

  return cardElement;
}

export function cardRemove(cardElement) {
  cardElement.remove();
}

export function cardLike(item) {
  item.classList.toggle("card__like-button_is-active");
}

