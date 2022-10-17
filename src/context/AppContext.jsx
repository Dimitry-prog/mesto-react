import {createContext, useContext, useEffect, useState} from "react";
import {api} from "../utils/Api";

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
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

  useEffect(() => {
    api.getUsersInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(e => {
        console.log(e);
      });

    api.getInitCards()
      .then(res => {
        console.log(res);
        setCards(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cards,
        setCards,
        selectedCard,
        isImagePopupOpen,
        setSelectedCard,
        setIsImagePopupOpen,
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        handleEditAvatarClick,
        handleAddProfileClick,
        handleEditProfileClick,
        handleClosePopups
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}

export {AppProvider, AppContext}