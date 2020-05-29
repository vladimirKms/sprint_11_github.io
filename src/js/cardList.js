export class CardList {

  constructor(container, arrCard, data) {
    //super(data)
  //constructor(container, arrCard){
 
  //constructor(container, arrCard){
    this._container = container;
    this._arrCard = arrCard;

  };

  addCard(name, link, cardArrNewAdd) {
    this._arrCard.push({ name, link });
    const newCard = cardArrNewAdd({ name, link })
    this.renderAddCard(this._container, newCard)
  };

  render() {
    for (const element of this._arrCard) {
      //this.renderAddCard(this._container, element)
      this.renderAddCard(element);
    }
  };

  // Можно лучше (читайте "Надо исправить")
  // Контейнер уже и так есть внутри класса
  // Нет нужды его передавать в метод
  //renderAddCard(containerElem, cardArr) { (+)
  renderAddCard(cardArr) {
      this._container.insertAdjacentHTML('beforeEnd', cardArr);
  };

  listenerLike() {

    this._container.addEventListener('click', this.like(this._container))


  };

  like(container) {
    container.addEventListener('click', function (event) {
      if (event.target.classList.contains('place-card__like-icon')) {
          event.target.classList.toggle('place-card__like-icon_liked');
      }
    })

  };

}
