const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function cardBuilder(dataCards, cardRemove) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = dataCards.link;
  cardElement.querySelector('.card__title').textContent = dataCards.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
      cardRemove(cardElement);
  });

  return cardElement;
}

function cardRemove(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (dataCards) {
  placesList.append(cardBuilder(dataCards, cardRemove)); 
});
