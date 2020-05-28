class Popup {
  constructor(container) {
    this.container = container;
   
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  closed() {
    this.container.classList.remove('popup_is-opened');
  }

  setListener() {
    const block= this.container;
    this.container.addEventListener('click', function (event) {
     
       if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup__button')) 
           block.classList.remove('popup_is-opened')
       
       if (event.target.classList.contains('popup__close_imag')){ 
              block.classList.remove('popup_is-opened')
      
        }
          
    })
  } 

}  