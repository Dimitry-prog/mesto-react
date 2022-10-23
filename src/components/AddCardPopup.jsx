import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";
import useFormValidation from "../hooks/useFormValidation";

const AddCardPopup = () => {
  const {cards, setCards, handleClosePopups, isAddPlacePopupOpen} = useAppContext();
  const {values, errors, isValid, handleChange} = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.postNewCard(values.place, values.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        handleClosePopups();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpenPopup={isAddPlacePopupOpen}
      submitText={isLoading ? "Сохрание..." : "Создать"}
      onSubmit={handleSubmit}
      isValidForm={isValid}
    >
      <label className="form__label">
        <input
          value={values.place || ''}
          onChange={handleChange}
          type="text"
          className="input form__input form__input_type_place"
          name="place"
          placeholder="Название"
          required
          id="place"
          minLength="2"
          maxLength="30"/>
        <span className="form__error-message form__error-message_active place-error">{errors.place}</span>
      </label>
      <label className="form__label">
        <input
          value={values.link || ''}
          onChange={handleChange}
          type="url"
          className="input form__input form__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          id="link"/>
        <span className="form__error-message form__error-message_active link-error">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
};

export default AddCardPopup;