import { deleteCard, likeCard, unlikeCard } from "./api.js";

export function buildCard(
  dataCard,
  userId,
  cardRemove,
  cardLike,
  imageClickHandler,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = dataCard.link;
  cardImage.alt = "Фотография " + dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  likeCount.textContent = dataCard.likes.length;

  // проверяем есть ли уже лайк
  const isUserLiked = dataCard.likes.some((like) => like._id === userId);
  if (isUserLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    cardLike(dataCard._id, likeButton, likeCount, userId);
  });

  // обработка кнопки удаления
  if (dataCard.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", function () {
      cardRemove(cardElement, dataCard._id);
    });
  }

  // обработка клика по изображению
  cardImage.addEventListener("click", () => {
    imageClickHandler(dataCard.link, dataCard.name);
  });

  return cardElement;
}

export function cardRemove(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка удаления карточки: ${err}`);
    });
}

export function cardLike(cardId, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? unlikeCard : likeCard;

  likeAction(cardId)
    .then((likedCard) => {
      likeCount.textContent = likedCard.likes.length;

      // проверяем есть ли уже лайк
      const isUserLiked = likedCard.likes.some((like) => like._id === userId);

      if (isUserLiked) {
        likeButton.classList.add("card__like-button_is-active");
      } else {
        likeButton.classList.remove("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.error(`Ошибка при изменении лайка: ${err}`);
    });
}
