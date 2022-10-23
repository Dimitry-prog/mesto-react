import React, {useEffect, useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";
import useFormValidation from "../hooks/useFormValidation";

const EditAvatarPopup = () => {
  const {setCurrentUser, handleClosePopups, isEditAvatarPopupOpen} = useAppContext();
  const {values, errors, isValid, handleChange} = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.patchAvatar(values.avatar)
      .then(res => {
        setCurrentUser(res);
        handleClosePopups();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpenPopup={isEditAvatarPopupOpen}
      submitText={isLoading ? "Сохрание..." : "Сохранить"}
      onSubmit={handleSubmit}
      isValidForm={isValid}
    >
      <label className="form__label">
        <input
          value={values.avatar || ''}
          onChange={handleChange}
          type="url"
          className="input form__input form__input_type_avatar"
          name="avatar"
          required
          id="avatar"
          placeholder="Ссылка на картинку"/>
        <span className="form__error-message form__error-message_active avatar-error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;