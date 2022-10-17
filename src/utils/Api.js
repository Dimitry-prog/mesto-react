class Api {
  constructor({ url, headers }) {
    this.url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUsersInfo() {
    return fetch(this.url + '/users/me', {
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitCards() {
    return fetch(this.url + '/cards', {
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialAppState() {
    return Promise.all([this.getUsersInfo(), this.getInitCards()])
  }

  patchProfile(name, about) {
    return fetch(this.url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  postNewCard(data) {
    return fetch(this.url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  toggleLikeCard(id, method) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: `${method ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  putLikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  removeLikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  patchAvatar(linkAvatar) {
    return fetch(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar
      }),
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
    'Content-Type': 'application/json'
  }
});