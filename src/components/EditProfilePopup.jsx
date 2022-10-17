import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const EditProfilePopup = () => {
  const {currentUser, setCurrentUser, handleClosePopups, isEditProfilePopupOpen} = useAppContext();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.patchProfile(name, about)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      });

    handleClosePopups();
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpenPopup={isEditProfilePopupOpen}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="input form__input form__input_type_name"
          name="name"
          required
          id="name"
          minLength="2"
          maxLength="40"
          placeholder="Enter name"/>
        <span className="form__error-message name-error"></span>
      </label>
      <label className="form__label">
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          type="text"
          className="input form__input form__input_type_activity"
          name="about"
          required
          id="about"
          placeholder="Enter activity"
          minLength="2"
          maxLength="200"/>
        <span className="form__error-message about-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;