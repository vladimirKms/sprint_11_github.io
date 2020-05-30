//
//
// См. Review.md
//
//


class Api {
  constructor(baseURL, token) {
    this.baseUrl = baseURL
   
    this.token = token;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .catch(err => { throw new Error(err.message) });

  }
  loadCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .catch(err => { throw new Error(err.message) });
  }

  setUserInfo(nameUser, aboutUser) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser
      })
    })
      .then(res => res.json())
      .catch(err => { throw new Error(err.message) });
  }

  addNewPlace(itemName, itemLink) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: itemName,
        link: itemLink
      })
    })
      .then(res => res.json())
      .catch(err => { throw new Error(err.message) });
  }

 
  deleteCard(activCardId) {
   
    return fetch(`${this.baseUrl}/cards/${activCardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token

      }
    })
      .catch(err => { throw new Error(err.message) });
  }

  liked(id) {
    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token
      }
    })
      .catch(err => { throw new Error(err.message) });
  }

  disliked(id) {
    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
    .catch(err => { throw new Error(err.message) });
  }

  setAvatar(linkAvatar) {
    
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkAvatar,
      })
    })
      .then(res => res.json())
      .catch(err => { throw new Error(err.message) });
  }
}
