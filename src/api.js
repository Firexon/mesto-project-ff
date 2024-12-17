const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "799b9abe-12a7-4b14-bb42-9765b9a2a2c5",
    "Content-Type": "application/json",
  },
};

// Проверка ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка информации о пользователе
const getUserData = () =>
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);

// Загрузка карточек
const getCards = () =>
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);

// Редактирование профиля
const editProfile = (name, about) =>
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);

// Добавление новой карточки
const addNewCard = (name, link) =>
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(checkResponse);

// удаление карточки
const deleteCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);

// Постановка и снятие лайка
const likeCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);

const unlikeCard = (cardId) =>
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);

// Обновление аватара пользователя
const updateAvatar = (avatarUrl) =>
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);

export {
  getUserData,
  getCards,
  editProfile,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
};
