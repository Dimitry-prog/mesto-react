import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {api} from "../utils/Api";
import {useAppContext} from "../context/AppContext";


const ConfirmDeleteCardPopup = () => {
  const { setCards, selectedCard, handleClosePopups, isDeleteCardPopupOpen } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard.id)
      .then(card => {
        setCards(state => state.filter(delCard => delCard._id !== selectedCard.id));
        handleClosePopups();
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpenPopup={isDeleteCardPopupOpen}
      submitText={isLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
      isValidForm={true}
    />
  );
};

export default ConfirmDeleteCardPopup;