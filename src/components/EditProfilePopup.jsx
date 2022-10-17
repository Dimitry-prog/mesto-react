import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";

const EditProfilePopup = ({isOpenPopup,handleClosePopups }) => {
  const {currentUser} = useAppContext();
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setActivity(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpenPopup={isOpenPopup}
      handleClosePopups={handleClosePopups}
      submitText="Сохранить"
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
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
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