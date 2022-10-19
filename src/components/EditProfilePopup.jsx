import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const EditProfilePopup = () => {
  const {currentUser, setCurrentUser, handleClosePopups, isEditProfilePopupOpen} = useAppContext();
  const [inputValues, setInputValues] = useState({
    name: '',
    about: ''
  });
  const [isValidForm, setIsValidForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    api.patchProfile(inputValues.name, inputValues.about)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

    handleClosePopups();

  }

  const validation = (inputValue) => {
    const errorMessage = {};
    if(!inputValue.name) {
      errorMessage.name = 'Заполните поле'
    } else if (inputValue.name.length < 3 || inputValue.name.length > 30) {
      errorMessage.name = 'Поле должно содержать минимум 3 символа, но не более 30'
    }
    if(!inputValue.about) {
      errorMessage.about = 'Заполните поле'
    } else if (inputValue.about.length < 5 || inputValue.about.length > 60) {
      errorMessage.about = 'Поле должно содержать минимум 5 символа, но не более 60'
    }

    return errorMessage;
  }

  const handleChange = (e) => {
    setInputValues({...inputValues, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    setInputValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser]);

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
      name="profile"
      title="Редактировать профиль"
      isOpenPopup={isEditProfilePopupOpen}
      submitText={isLoading ? "Сохрание..." : "Сохранить"}
      onSubmit={handleSubmit}
      isValidForm={isValidForm}
    >
      <label className="form__label">
        <input
          value={inputValues.name}
          onChange={handleChange}
          type="text"
          className="input form__input form__input_type_name"
          name="name"
          required
          id="name"
          placeholder="Enter name"/>
         <span className="form__error-message form__error-message_active name-error">{errors.name}</span>
      </label>
      <label className="form__label">
        <input
          value={inputValues.about}
          onChange={handleChange}
          type="text"
          className="input form__input form__input_type_activity"
          name="about"
          required
          id="about"
          placeholder="Enter activity"
          minLength="2"
          maxLength="200"/>
        <span className="form__error-message form__error-message_active about-error">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;