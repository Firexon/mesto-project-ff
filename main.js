(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"799b9abe-12a7-4b14-bb42-9765b9a2a2c5","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function o(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__like-button"),u=c.querySelector(".card__like-count"),l=c.querySelector(".card__delete-button");return a.src=e.link,a.alt="Фотография "+e.name,c.querySelector(".card__title").textContent=e.name,u.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){r(e._id,i,u,t)})),e.owner._id!==t?l.remove():l.addEventListener("click",(function(){n(c,e._id)})),a.addEventListener("click",(function(){o(e.link,e.name)})),c}function c(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){n.remove()})).catch((function(e){console.error("Ошибка удаления карточки: ".concat(e))}))}function a(e,t,o,c){(t.classList.contains("card__like-button_is-active")?r:n)(e).then((function(e){o.textContent=e.likes.length,e.likes.some((function(e){return e._id===c}))?t.classList.add("card__like-button_is-active"):t.classList.remove("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при изменении лайка: ".concat(e))}))}function i(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__close"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}var s=function(e,t,n){n?function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(n.setAttribute("disabled",!0),n.classList.add(t.inactiveButtonClass)):(n.removeAttribute("disabled",!1),n.classList.remove(t.inactiveButtonClass)):console.error("Кнопка не найдена!")},d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r&&(t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent="")},p=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),s(n,t,r)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".places__list"),m=document.querySelector(".profile__image"),y=document.querySelector(".popup_type_new-avatar"),v=document.forms["new-avatar"],h=document.querySelector(".popup__input_type_url_avatar"),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_edit"),q=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),E=document.forms["edit-profile"],C=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),A=document.forms["new-place"],w=document.querySelector(".popup__input_type_card-name"),U=document.querySelector(".popup__input_type_url"),T=document.querySelector(".popup_type_image"),j=T.querySelector(".popup__image"),B=T.querySelector(".popup__caption"),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(t){t.target===e&&u(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){return u(e.closest(".popup"))}))}));var P,D=function(e,t){var n=e.querySelector(O.submitButtonSelector);n&&(t?(n.dataset.originalText=n.textContent,n.textContent="Сохранение..."):n.textContent=n.dataset.originalText||"Сохранить")};function I(e,t){j.src=e,j.alt="Фотография "+t,B.textContent=t,i(T)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,t,r),n.forEach((function(o){o.addEventListener("input",(function(){s(n,t,r),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=t.validationMessage,r.classList.add(n.errorClass)}(e,t,n)}(e,o,t)}))}))}(t,e)}))}(O),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=r[0],u=r[1];P=i._id,q.textContent=i.name,k.textContent=i.about,m.style.backgroundImage="url(".concat(i.avatar,")"),u.forEach((function(e){var t=o({name:e.name,link:e.link,owner:e.owner,likes:e.likes,_id:e._id},P,c,a,I);_.append(t)}))})).catch((function(e){console.error("Ошибка загрузки данных: ".concat(e))})),v.addEventListener("submit",(function(n){var r;n.preventDefault(),D(v,!0),(r=h.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){m.src=e.avatar,u(y)})).catch((function(e){return console.error("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){D(v,!1)}))})),m.addEventListener("click",(function(){i(y),p(v,O),v.reset()})),E.addEventListener("submit",(function(n){var r,o;n.preventDefault(),D(E,!0),(r=C.value,o=L.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){q.textContent=e.name,k.textContent=e.about,u(S)})).catch((function(e){return console.error("Ошибка при сохранении данных профиля: ".concat(e))})).finally((function(){D(E,!1)}))})),b.addEventListener("click",(function(){i(S),C.value=q.textContent,L.value=k.textContent,p(E,O)})),A.addEventListener("submit",(function(n){var r,i;n.preventDefault(),D(A,!0),(r=w.value,i=U.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:i})}).then(t)).then((function(e){var t=o({name:e.name,link:e.link,owner:e.owner||{},likes:e.likes||[],_id:e._id},P,c,a,I);_.prepend(t),u(x)})).catch((function(e){return console.error("Ошибка при добавлении новой карточки: ".concat(e))})).finally((function(){D(A,!1)}))})),g.addEventListener("click",(function(e){i(x),A.reset(),p(A,O)}))})();