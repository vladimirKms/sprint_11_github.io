class Card {

constructor(){
  }

  create(data, userName) {
    let myLike = '';
    let arr = [];
    arr = data.likes;
    const jsonStr = JSON.stringify(arr);
       
    if (jsonStr.includes(userName)) { myLike = 'place-card__like-icon_liked' }
   
    else { myLike = '' }
 
   
    const template = `<div class="place-card" id=${data._id}>
                <div class="place-card__image"><img src=${data.link} class="place-card__image_image">
                  <button class="place-card__delete-icon"></button>
                </div>
                  <div class="place-card__description">
                  <h3 class="place-card__name">${data.name}</h3>
                  <button class="place-card__like-icon ${myLike}"></button>
                  </div>
                 <div class="place-card__like-count">${data.likes.length}</div>
              </div>`
   

    return template;
 
  }

  remove(event) {
    const removeNod = event.target;
    removeNod.closest('.place-card').remove();

  }

  // Геттер -- отлично!
  get cardElement() {
    this._cardElement = this.create();


    return this._cardElement;
  }



  like(container) {
    container.addEventListener('click', function (event) {
      if (event.target.classList.contains('place-card__like-icon')) {
          event.target.classList.toggle('place-card__like-icon_liked');
      }
    })
  }

}

