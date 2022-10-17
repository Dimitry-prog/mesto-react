import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useAppContext} from "../context/AppContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";

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

      <AddCardPopup isOpenPopup={isAddPlacePopupOpen} handleClosePopups={handleClosePopups}/>

    </div>
  );
}

export default App;
