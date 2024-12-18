export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const closeButton = popup.querySelector(".popup__close");
  document.addEventListener("keydown", escClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
}

function escClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}