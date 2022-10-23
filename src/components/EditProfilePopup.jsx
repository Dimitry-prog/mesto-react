import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";
import useFormValidation from "../hooks/useFormValidation";

const EditProfilePopup = () => {
  const {currentUser, setCurrentUser, handleClosePopups, isEditProfilePopupOpen} = useAppContext();
  const {values, errors, isValid, setValues, setIsValid, handleChange} = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    api.patchProfile(values.name, values.about)
      .then(res => {
        setCurrentUser(res);
        handleClosePopups();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsValid(true);
    setValues({
      name: currentUser.name,
      about: currentUser.about
    })
  }, [currentUser, isEditProfilePopupOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpenPopup={isEditProfilePopupOpen}
      submitText={isLoading ? "Сохрание..." : "Сохранить"}
      onSubmit={handleSubmit}
      isValidForm={isValid}
    >
      <label className="form__label">
        <input
          value={values.name || ''}
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
          value={values.about || ''}
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