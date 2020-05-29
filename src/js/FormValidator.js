class FormValidator {
  constructor(formElement) {
    this.formElement = formElement;
    this.inputFild = this.formElement.querySelectorAll('.popup__input');
    this.buttonSubmit = this.formElement.querySelector('.button');
    
  }

  checkInputValidity(event) {
  
    const inputElem = event.target;
    const errorElem = this.formElement.querySelector(`#${inputElem.name}-error`);
     
    if (inputElem.validity.valueMissing) {
      inputElem.setCustomValidity('Это обязательное поле');

    } else if (inputElem.validity.tooShort) {
      inputElem.setCustomValidity('Должно быть от 2 до 30 символов');

    } else if (inputElem.validity.typeMismatch) {
      inputElem.setCustomValidity('Здесь должна быть ссылка');

    } else {
      inputElem.setCustomValidity('');
    }
    errorElem.textContent = inputElem.validationMessage;

  }

  setSubmitButtonState() {

    if (this.formElement.checkValidity()) {
      this.buttonSubmit.removeAttribute('disabled');
      this.buttonSubmit.classList.add('button_activ');
      this.buttonSubmit.classList.remove('button_passiv');

    } else {
      this.buttonSubmit.setAttribute('disabled', true);
      this.buttonSubmit.classList.remove('button_activ');
      this.buttonSubmit.classList.add('button_passiv');
    }

  }

  setEventListeners() {

    this.inputFild.forEach(inputElem => {


      inputElem.addEventListener('input', this.checkInputValidity.bind(this));
    });

    this.formElement.addEventListener('input', this.setSubmitButtonState.bind(this)
    );
  }
}
