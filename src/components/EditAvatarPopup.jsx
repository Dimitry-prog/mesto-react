import React, {useEffect, useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const EditAvatarPopup = () => {
  const {setCurrentUser, handleClosePopups, isEditAvatarPopupOpen} = useAppContext();
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.patchAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      });

    handleClosePopups();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpenPopup={isEditAvatarPopupOpen}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          value={avatar}
          onChange={(e)=> setAvatar(e.target.value)}
          type="url"
          className="input form__input form__input_type_avatar"
          name="avatar"
          required
          id="avatar"
          placeholder="Ссылка на картинку"/>
        <span className="form__error-message avatar-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;