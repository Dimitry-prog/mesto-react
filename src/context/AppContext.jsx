import {createContext, useContext, useEffect, useState} from "react";
import {api} from "../utils/Api";

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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