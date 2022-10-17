import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useAppContext} from "../context/AppContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const {setIsImagePopupOpen} = useAppContext();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddProfileClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleClosePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page">
      <Header/>

      <Main
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddProfileClick={handleAddProfileClick}
      />
      <Footer/>

        <ImagePopup
        handleClosePopups={handleClosePopups}
        />

      <EditAvatarPopup isOpenPopup={isEditAvatarPopupOpen} handleClosePopups={handleClosePopups}/>

      <EditProfilePopup isOpenPopup={isEditProfilePopupOpen} handleClosePopups={handleClosePopups}/>

      <PopupWithForm
        name="card"
        title="Новое место"
        isOpenPopup={isAddPlacePopupOpen}
        handleClosePopups={handleClosePopups}
        submitText="Создать"
      >
        <label className="form__label">
          <input type="text" className="input form__input form__input_type_place" name="place" placeholder="Название"
                 required id="place" minLength="2" maxLength="30"/>
          <span className="form__error-message place-error"></span>
        </label>
        <label className="form__label">
          <input type="url" className="input form__input form__input_type_link" name="link"
                 placeholder="Ссылка на картинку"
                 required id="link"/>
          <span className="form__error-message link-error"></span>
        </label>
      </PopupWithForm>

    </div>
  );
}

export default App;
