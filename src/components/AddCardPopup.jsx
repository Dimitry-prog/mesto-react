import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const AddCardPopup = () => {
  const {cards, setCards, handleClosePopups, isAddPlacePopupOpen} = useAppContext();
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.postNewCard(place, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(e => {
        console.log(e);
      });

    handleClosePopups();
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpenPopup={isAddPlacePopupOpen}
      submitText="Создать"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          type="text"
          className="input form__input form__input_type_place"
          name="place"
          placeholder="Название"
          required
          id="place"
          minLength="2"
          maxLength="30"/>
        <span className="form__error-message place-error"></span>
      </label>
      <label className="form__label">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="url"
          className="input form__input form__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          id="link"/>
        <span className="form__error-message link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddCardPopup;