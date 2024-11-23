export function buildCard(dataCard, cardRemove, cardLike, imageClickHandler) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = dataCard.link;
  cardImage.alt = "Фотография " + dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;

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

  // popup по клику на картинку
  cardImage.addEventListener("click", () => {
    imageClickHandler(dataCard.link, dataCard.name);
  });

  return cardElement;
}

export function cardRemove(cardElement) {
  cardElement.remove();
}

export function cardLike(item) {
  item.classList.toggle("card__like-button_is-active");
}

