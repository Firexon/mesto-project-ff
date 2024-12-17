import "../pages/index.css";
import { buildCard, cardRemove, cardLike } from "./card.js";
// import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  configValidation,
  setLoadingState,
} from "./validation.js";
import {
  getUserData,
  getCards,
  editProfile,
  addNewCard,
  updateAvatar,
} from "./api.js";

// вывод карточек
const placesList = document.querySelector(".places__list");

// аватар
const profileImageElement = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_new-avatar");
const updateAvatarForm = document.forms["new-avatar"];
const avatarUrlInput = document.querySelector(".popup__input_type_url_avatar");

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

// включили валидацию
enableValidation(configValidation);

// прогрузка карточек
let userId;

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageElement.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((cardData) => {
      const card = buildCard(
        {
          name: cardData.name,
          link: cardData.link,
          owner: cardData.owner,
          likes: cardData.likes,
          _id: cardData._id,
        },
        userId,
        cardRemove,
        cardLike,
        imageClickHandler,
      );
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка загрузки данных: ${err}`);
  });

// Аватара попап
updateAvatarForm.addEventListener("submit", avatarFormSubmit);

profileImageElement.addEventListener("click", () => {
  openModal(avatarPopup);
  clearValidation(updateAvatarForm, configValidation);
  updateAvatarForm.reset();
});

function avatarFormSubmit(evt) {
  evt.preventDefault();
  setLoadingState(updateAvatarForm, true);

  updateAvatar(avatarUrlInput.value)
    .then(() => {
      closeModal(avatarPopup);
    })
    .catch((err) => console.error(`Ошибка при обновлении аватара: ${err}`))
    .finally(() => {
      setLoadingState(updateAvatarForm, false); //сброс состояния загрузки
    });
}

// edit модальное окно
formElement.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", function () {
  clearValidation(formElement, configValidation);
  openModal(editPopup);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  setLoadingState(formElement, true);

  editProfile(nameInput.value, jobInput.value)
    .then((updatedUserData) => {
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;
      closeModal(editPopup);
    })
    .catch((err) =>
      console.error(`Ошибка при сохранении данных профиля: ${err}`),
    )
    .finally(() => {
      setLoadingState(formElement, false);
    });
}

// + модальное окно
addPlaceForm.addEventListener("submit", addPlaceSubmit);

newCardButton.addEventListener("click", function (evt) {
  clearValidation(addPlaceForm, configValidation);
  openModal(newCardPopup);
  addPlaceForm.reset();
});

function addPlaceSubmit(evt) {
  evt.preventDefault();
  setLoadingState(addPlaceForm, true);

  addNewCard(placeNameInput.value, imgLinkInput.value)
    .then((newCardData) => {
      const newCard = buildCard(
        {
          name: newCardData.name,
          link: newCardData.link,
          owner: newCardData.owner || {},
          likes: newCardData.likes || [],
          _id: newCardData._id,
        },
        userId,
        cardRemove,
        cardLike,
        imageClickHandler,
      );
      placesList.prepend(newCard);
      closeModal(newCardPopup);
    })
    .catch((err) =>
      console.error(`Ошибка при добавлении новой карточки: ${err}`),
    )
    .finally(() => {
      setLoadingState(addPlaceForm, false);
    });
}

// img модальное окно
function imageClickHandler(link, name) {
  ImageInsidePopup.src = link;
  ImageInsidePopup.alt = "Фотография " + name;
  popupCaption.textContent = name;
  openModal(cardImagePopup);
}
