import React, {useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useAppContext} from "../context/AppContext";
import {api} from "../utils/Api";

const EditAvatarPopup = () => {
  const {setCurrentUser, handleClosePopups, isEditAvatarPopupOpen} = useAppContext();
  const inputRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.patchAvatar(inputRef.current.value)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));

    handleClosePopups();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpenPopup={isEditAvatarPopupOpen}
      submitText={isLoading ? "Сохрание..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          ref={inputRef}
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