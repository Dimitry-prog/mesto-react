import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setIsOpenPopup(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setIsOpenPopup(true);
  }

  const handleAddProfileClick = () => {
    setIsAddPlacePopupOpen(true);
    setIsOpenPopup(true);
  }

  const handleClosePopups = () => {
    setIsOpenPopup(false);
    setSelectedCard({});
  }

  const handleCardClick = (name, link) => {
    setSelectedCard({
      src: link,
      alt: name
    });
    setIsOpenPopup(true);
  }

  return (
    <div className="page">
      <Header/>
      <Main
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddProfileClick={handleAddProfileClick}
        handleCardClick={handleCardClick}
      />
      <Footer/>

      <ImagePopup
        selectedCard={selectedCard}
        handleClosePopups={handleClosePopups}
        isOpenPopup={isOpenPopup}
      />

      {isEditAvatarPopupOpen && (
        <PopupWithForm
          name={"avatar"}
          title={'Обновить аватар'}
          isOpenPopup={isOpenPopup}
          handleClosePopups={handleClosePopups}
          submitText={'Сохранить'}
        >
          <label className="form__label">
            <input type="url" className="input form__input form__input_type_avatar" name="avatar" required id="avatar"
                   placeholder="Ссылка на картинку"/>
              <span className="form__error-message avatar-error"></span>
          </label>
        </PopupWithForm>
      )}

      {isEditProfilePopupOpen && (
        <PopupWithForm
          name={'profile'}
          title={'Редактировать профиль'}
          isOpenPopup={isOpenPopup}
          handleClosePopups={handleClosePopups}
          submitText={'Сохранить'}
        >
          <label className="form__label">
            <input type="text" className="input form__input form__input_type_name" name="name" required id="name"
                   minLength="2" maxLength="40" placeholder="Enter name"/>
            <span className="form__error-message name-error"></span>
          </label>
          <label className="form__label">
            <input type="text" className="input form__input form__input_type_activity" name="about" required
                   id="about"
                   placeholder="Enter activity" minLength="2" maxLength="200"/>
            <span className="form__error-message about-error"></span>
          </label>
        </PopupWithForm>
      )}

      {isAddPlacePopupOpen && (
        <PopupWithForm
          name={'card'}
          title={'Новое место'}
          isOpenPopup={isOpenPopup}
          handleClosePopups={handleClosePopups}
          submitText={'Создать'}
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
      )}

    </div>
  );
}

export default App;
