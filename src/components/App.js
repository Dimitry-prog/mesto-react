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

  return (
    <div className="page">
      <Header/>
      <Main/>
      <Footer/>

      <ImagePopup/>
      <EditAvatarPopup/>
      <EditProfilePopup/>
      <AddCardPopup />

    </div>
  );
}

export default App;
