import React, {useEffect, useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const EditAvatarPopup = () => {
  const {setCurrentUser, handleClosePopups, isEditAvatarPopupOpen} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.patchAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        handleClosePopups();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

  }

  const validation = (inputValue) => {
    const errorMessage = {};
    if (!inputValue.length) {
      errorMessage.avatar = 'Поле не может быть пустым';
    } else if (!inputValue.startsWith('https://')) {
      errorMessage.avatar = 'Введите ссылку';
    }

    return errorMessage;
  }

  const handleChange = (e) => {
    setAvatar(e.target.value);
  }


  useEffect(() => {

    setErrors(validation(avatar));
    if (Object.values(errors).length === 0) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }

  }, [avatar, Object.values(errors).length])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpenPopup={isEditAvatarPopupOpen}
      submitText={isLoading ? "Сохрание..." : "Сохранить"}
      onSubmit={handleSubmit}
      isValidForm={isValidForm}
    >
      <label className="form__label">
        <input
          value={avatar}
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