/* eslint-disable spaced-comment */
/* eslint-disable prefer-arrow-callback */
"use strict";
console.log('NOD', process.env.NODE_ENV);
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
const cardArr = [];// пустой массив для хранения карточек Places
//nameInput.value = '';
//linkInput.value = '';
//const about = '';
const groupId = 'cohort10';
const token = 'c99d9dc5-01b5-4221-954d-07046ff780fc'
// Переменная определена некорректно
// Надо исправить(+)
const baseUrl = `https://praktikum.tk/${groupId}`;
const Output = { userName, userJob }
const Input = { userFormNameInput, userFormJobInput }
//let likeCount = 0
const userInfo = new UserInfo(Output, Input);


//= ===================================================
// запрос с сервера начальных данных name, about и аватар.
const api = new Api(baseUrl, token)
//const api = new Api(baseUrl, token, userName.textContent, userJob.textContent, )
api.getUserInfo()
  .then((result) => {
    // console.log('USER INFO', result)
    userName.textContent = result.name;
    userJob.textContent = result.about;
    avatar.style.backgroundImage = 'url(' + `${result.avatar}` + ')';

  })
  .catch(err => { throw new Error(err.message) });

//= ===================================================


//const imagePrevew = document.querySelector('.popup__conntent_imag');===============

const newPlacePopup = new Popup(addCard);

const newUserPopup = new Popup(addCardUser)

const newAvatar = new Popup(addNewAvatar)

const cardNew = new CardList(placesList, cardArr);

const singlCard = new Card()

newAvatar.setListener()
newUserPopup.setListener()   //= ========================

// const NAME = userPageInfo.querySelector('.user-info__name')


const validNewUserInput = new FormValidator(userForm);
const validPlacesInput = new FormValidator(addCardForm);
const validAvatar = new FormValidator(addNewAvatarForm);

validNewUserInput.setEventListeners();
validPlacesInput.setEventListeners();
validAvatar.setEventListeners();

// console.log('userInfo', userPageInfo)

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
  //console.log(userFormNameInput.validity)//=========================================================
  userNameErr.textContent = '';
  userJobErr.textContent = '';
  return userInfo.setUserDefault();

};



//= ===========================================================

api.loadCards()

  .then((initialCards) => {// ф-ция возвращает массив card Arr[] наполненный
    // карточками на основе шаблона и массива initialCard - результат запроса к серверу

    for (const element of initialCards) {
      //console.log('load Card',userName.textContent)
      cardArr.push(singlCard.create(element, userName.textContent))
    }

    return cardArr;
  }
  )
  .then(() => {
    cardNew.listenerLike() // слушатель на кнопку "like"
    cardNew.render()
  })
  .catch(err => { throw new Error(err.message) });



//function createDOMCard(item) {// ф-ция возвращает одну карточку arr
 // return singlCard.create(item)
//}


const addCardAdd = function (event) {
  event.preventDefault()
  api.addNewPlace(nameInput.value, linkInput.value)
   .then((res) => {
   //  const addCardArr = res.pop()
      // Присвоение в константу
      // Надо исправить
      // Раньше здесь у вас была переменная объявленная локально в методе
      //const addCardArr = res.pop()
      //const newCard = createDOMCard(addCardArr);
      //console.log(createDOMCard(addCardArr))
  //    const newCard = singlCard.create(addCardArr,userName.textContent)
  //    cardNew.renderAddCard(newCard);
  //console.log('POST',res)
  const oneCard = singlCard.create(res,userName.textContent)
  cardNew.renderAddCard(oneCard)})
 
    .catch(err => { throw new Error(err.message) });
}


//= =======================new Avatar=================================

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

//= ===================установка нового USER(a)==========================================

//const buttonSubmit = addCardUser.querySelector('.popup__button_about-user')

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
// const likeCount=placesList.querySelector('.place-card__like-count')

placesList.addEventListener('click', function (event) {

  if (event.target.classList.contains('place-card__like-icon')) {
    const cardLike = event.target.closest('.place-card')
    //console.log('ID LIKE', cardLike.id)

    const id = cardLike.id;// id текущего элемента
    //console.log('liked_ID', id, ':');
    const containerLike = event.target.closest('.place-card');
    // const
    let countLike = containerLike.querySelector('.place-card__like-count').textContent

    if (!(event.target.classList.contains('place-card__like-icon_liked'))) {/*console.log('like') */
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




// слушатель на нажатие кнопки "edit" (addNewUser)
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('user-about__button')) { addCardOpenUser() }
});

// слушатель на нажатие кнопки "+" (addNewPlaces)
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('placesAdd__button')) { addCardOpen() }
});

// слушатель на разрешение отправки данных формы ввода "Places" (активация кнопки "+")
document.forms.new.addEventListener('submit', addCardAdd);

// слушатель на разрешение отправки данных формы ввода "Avatar" (активация кнопки "Сохранить")
addNewAvatarForm.addEventListener('submit', function (event) {
  event.preventDefault()
  api.setAvatar(linkAvatar.value)
    .then(() => {
      avatar.style.backgroundImage = 'url(' + linkAvatar.value + ')'
      newAvatar.closed()

    })
    .catch(err => { throw new Error(err.message) });
});



// слушатель на удаление карточки Places (значек "ведерко")
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const activCardId = event.target.closest('.place-card').id
    //console.log('DELETE ID', activCardId)
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
// слушатель ImagPrevew
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__image_image')) {
    ImagPrevew(event)
  }
});

