/* eslint-disable spaced-comment */
/* eslint-disable prefer-arrow-callback */
"use strict";
import "./pages/index.css";
import {Api} from './js/api.js';
import {CardList} from './js/cardList.js';
import {Card} from './js/card.js';
import {Popup} from './js/Popup.js';
import {FormValidator} from './js/FormValidator.js';
import {UserInfo} from './js/UserInfo.js';
const placesList = document.querySelector('.places-list'); // создание переменной для общего элемента страницы с карточками
const addCard = document.querySelector('.popup');// общая форма ввода новой краточки
const addCardUser = document.querySelector('.popup__user');// общая форма добавления нового user(a)
const addCardForm = document.querySelector('.popup__form');// форма ввода новой картинки
const nameInput = addCardForm.querySelector('.popup__input_type_name');// поле nameInput
const linkInput = addCardForm.querySelector('.popup__input_type_link-url');// поле linkInput
const avatar = document.querySelector('div .user-info__photo')
const addNewAvatar = document.querySelector('.popup__avatar')
const addNewAvatarForm = document.querySelector('.popup__form_avatar')
const avatarSubmit = addNewAvatar.querySelector('.popup__button_avatar')
const userJob = document.querySelector('.user-info__job');// профессия (работа) пользователя в заголовке страницы
const userName = document.querySelector('.user-info__name');// имя пользователя в заголовке страницы
const userForm = document.querySelector('.popup__form_user');// перменная для формы ввода новых данных о пользователе
const userFormNameInput = userForm.querySelector('.popup__input_type_name-user');// новый пользователь InputName
const userFormJobInput = userForm.querySelector('.popup__input_type_about-user');// новый пользователь InputJob
const imageBlock = document.querySelector('.popup__imag');
const linkAvatar = addNewAvatarForm.querySelector('.popup__input_type_link-avatar')// новый avatar
const buttonSubmit = addCardUser.querySelector('.popup__button_about-user')
const nameErr = addCardForm.querySelector('#name-error')
const linkErr = addCardForm.querySelector('#link-error')
const userNameErr = addCardUser.querySelector('#formNameUser-error')
const userJobErr = addCardUser.querySelector('#formJobUser-error')
let initialCards = [];
const cardArr = [];
const groupId = 'cohort10';
const token = 'c99d9dc5-01b5-4221-954d-07046ff780fc';
const env= NODE_ENV;
const baseUrl = (env==='development') ? `http://praktikum.tk/${groupId}`:`https://praktikum.tk/${groupId}`;
console.log('URL', baseUrl);
const Output = { userName, userJob };
const Input = { userFormNameInput, userFormJobInput };
const userInfo = new UserInfo(Output, Input);
//===================================================
const api = new Api(baseUrl, token)
api.getUserInfo()
  .then((result) => {
    // console.log('USER INFO', result)
    userName.textContent = result.name;
    userJob.textContent = result.about;
    avatar.style.backgroundImage = 'url(' + `${result.avatar}` + ')';

  })
  .catch(err => { throw new Error(err.message) });

//= ===================================================

const newPlacePopup = new Popup(addCard);

const newUserPopup = new Popup(addCardUser)

const newAvatar = new Popup(addNewAvatar)

const cardNew = new CardList(placesList, cardArr);

const singlCard = new Card()

newAvatar.setListener()
newUserPopup.setListener()   //= ========================
const validNewUserInput = new FormValidator(userForm);
const validPlacesInput = new FormValidator(addCardForm);
const validAvatar = new FormValidator(addNewAvatarForm);

validNewUserInput.setEventListeners();
validPlacesInput.setEventListeners();
validAvatar.setEventListeners();

function addCardOpen() {//============================================
  nameInput.value = '';
  linkInput.value = '';
  newPlacePopup.open();
  newPlacePopup.setListener();
  nameErr.textContent = '';
  linkErr.textContent = '';
  validPlacesInput.setSubmitButtonState()
}
//= ====================================================
function addCardOpenUser() {
  newUserPopup.open()
  buttonSubmit.classList.remove('popup__button_load')
  buttonSubmit.textContent = 'Сохранить'
//=========================================================
  userNameErr.textContent = '';
  userJobErr.textContent = '';
  return userInfo.setUserDefault();

};



//===========================================================

api.loadCards()

  .then((initialCards) => {
    for (const element of initialCards) {
      cardArr.push(singlCard.create(element, userName.textContent))
    }
    return cardArr;
  }
  )
  .then(() => {
    cardNew.listenerLike() 
    cardNew.render()
  })
  .catch(err => { throw new Error(err.message) });


const addCardAdd = function (event) {
  event.preventDefault()
  api.addNewPlace(nameInput.value, linkInput.value)
   .then((res) => {
  const oneCard = singlCard.create(res,userName.textContent)
  cardNew.renderAddCard(oneCard)})
   .catch(err => { throw new Error(err.message) });
}


//=======================new Avatar=================================

function addAvatar() {
  linkAvatar.value = ' ';
  newAvatar.open()
  avatarSubmit.setAttribute('disabled', true);
  avatarSubmit.classList.remove('button_activ');

}

//= =======================================================
const imagePrevewPopup = new Popup(imageBlock);
imagePrevewPopup.setListener();

function ImagPrevew(event) {
  const realyPrivew = document.querySelector('.popup__image_prevew')
  imagePrevewPopup.open();
  img.onload = () => {
    let width = realyPrivew.width;
    let height = realyPrivew.height;
    width = width / 2;
    height = height / 2;
    const buttonClosed = document.querySelector('.popup__close_imag');
    buttonClosed.style.right = `-${width}px`;
    buttonClosed.style.top = `-${height}px`;

  }
  const imgSrc = document.querySelector('.popup__image_prevew');
  const srcPrivew = event.target;
  imgSrc.src = srcPrivew.src;

}
//===================установка нового USER(a)==========================================
document.forms.user.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup__button_submit')) {
    event.preventDefault()
    buttonSubmit.classList.add('popup__button_load')
    buttonSubmit.textContent = 'Загрузка...'
    api.setUserInfo(userFormNameInput.value, userFormJobInput.value)
      .then(() => {
        userName.textContent = userFormNameInput.value;
        userJob.textContent = userFormJobInput.value;
        newUserPopup.closed()
        buttonSubmit.classList.remove('popup__button_load')
        buttonSubmit.textContent = 'Сохранить'

      })
      .catch(err => { throw new Error(err.message) });
  }

}
);
/* -------------------!СЛУШАТЕЛИ!-----------------------------*/

placesList.addEventListener('click', function (event) {

  if (event.target.classList.contains('place-card__like-icon')) {
    const cardLike = event.target.closest('.place-card')
    const id = cardLike.id;
    const containerLike = event.target.closest('.place-card');
    let countLike = containerLike.querySelector('.place-card__like-count').textContent
    if (!(event.target.classList.contains('place-card__like-icon_liked'))) {
      api.liked(id)
        .then(() => containerLike.querySelector('.place-card__like-count').textContent = Number(countLike) + 1)
        .catch(err => { throw new Error(err.message) });

    }

    else {
      api.disliked(id)
        .then(() => containerLike.querySelector('.place-card__like-count').textContent = Number(countLike) - 1)
        .catch(err => { throw new Error(err.message) });
    }
  }
})

// Слушатель на аватар
document.addEventListener('click', function (event) {

  if (event.target.classList.contains('user-info__photo')) {
    addAvatar()
  }
})

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('user-about__button')) { addCardOpenUser() }
});


document.addEventListener('click', function (event) {
  if (event.target.classList.contains('placesAdd__button')) { addCardOpen() }
});

document.forms.new.addEventListener('submit', addCardAdd);

addNewAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault()
  api.setAvatar(linkAvatar.value)
    .then(() => {
      avatar.style.backgroundImage = 'url(' + linkAvatar.value + ')'
      newAvatar.closed()

    })
    .catch(err => { throw new Error(err.message) });
});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const activCardId = event.target.closest('.place-card').id
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      api.deleteCard(activCardId)
        .then(() => {
          singlCard.remove(event)
        })
        .catch(err => { throw new Error(err.message) });
    }
  }
});

/*------------------------------------------------------------*/
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__image_image')) {
    ImagPrevew(event)
  }
});

