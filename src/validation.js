export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Проверяет, есть ли невалидный инпут
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключает состояние кнопки
const toggleButtonState = (inputList, configValidation, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(configValidation.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", false);
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
};

// Показывает ошибку
const showInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(configValidation.errorClass);
};

// Прячет ошибку
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(configValidation.inputErrorClass);
    errorElement.classList.remove(configValidation.errorClass);
    errorElement.textContent = "";
  }
};

// Проверяет валидность
const isValid = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

// Устанавливает обработчики событий
const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector,
  );

  toggleButtonState(inputList, configValidation, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, configValidation, buttonElement);
      isValid(formElement, inputElement, configValidation);
    });
  });
};

// Включает валидацию
export const enableValidation = (configValidation) => {
  const formList = Array.from(
    document.querySelectorAll(configValidation.formSelector),
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};

// чистка валидации
export const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector,
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configValidation);
  });

  toggleButtonState(inputList, configValidation, buttonElement);
};

// кнопка при подгрузке
export const setLoadingState = (formElement, isLoading) => {
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector,
  );
  if (buttonElement) {
    if (isLoading) {
      buttonElement.dataset.originalText = buttonElement.textContent;
      buttonElement.textContent = "Сохранение...";
    } else {
      buttonElement.textContent =
        buttonElement.dataset.originalText || "Сохранить";
    }
  }
};
