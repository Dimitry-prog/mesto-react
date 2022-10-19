import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const AddCardPopup = () => {
  const {cards, setCards, handleClosePopups, isAddPlacePopupOpen} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    place: '',
    link: ''
  });
  const [isValidForm, setIsValidForm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.postNewCard(inputValues.place, inputValues.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

    handleClosePopups();
  }

  const validation = (inputValue) => {
    const errorMessage = {};
    if(!inputValue.place) {
      errorMessage.place = 'Заполните поле';
    } else if (inputValue.place.length < 3 || inputValue.place.length > 30) {
      errorMessage.place = 'Поле должно содержать минимум 3 символа, но не более 30';
    }
    if(!inputValue.link) {
      errorMessage.link = 'Заполните поле';
    } else if (!inputValue.link.startsWith('https://')) {
      errorMessage.link = 'Введите ссылку';
    }

    return errorMessage;
  }

  const handleChange = (e) => {
    setInputValues({...inputValues, [e.target.name]: e.target.value});
  }

  useEffect(() => {

    setErrors(validation(inputValues));
    if (Object.values(errors).length === 0) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }

  }, [inputValues, Object.values(errors).length])

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpenPopup={isAddPlacePopupOpen}
      submitText={isLoading ? "Сохрание..." : "Создать"}
      onSubmit={handleSubmit}
      isValidForm={isValidForm}
    >
      <label className="form__label">
        <input
          value={inputValues.place}
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
          value={inputValues.link}
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