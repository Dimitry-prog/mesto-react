import React from "react";
import deleteIcon from "../images/delete.svg";
import {useAppContext} from "../context/AppContext";

const Card = ({link, name, likes, owner}) => {
  const {currentUser, setSelectedCard, setIsImagePopupOpen} = useAppContext();
  const isMyCard = owner._id === currentUser._id;
  const isMeLikeCard = likes.some(me => me._id === currentUser._id);

   const handleImgClick = (name, link) => {
    setSelectedCard({
      src: link,
      alt: name
    });
    setIsImagePopupOpen(true);
  }

  return (
      <li className="elements__item" >
        <div className="card">
          <img src={link} alt={name} className="card__img" onClick={() => handleImgClick(name, link)}/>
          {isMyCard && <img src={deleteIcon} alt="удалить" className="card__delete"/>}
          <div className="card__footer">
            <h2 className="card__title">{name}</h2>
            <div className="card__stats">
              <button
                className={`button button_type_like card__like ${isMeLikeCard ? 'card__like_active' : ""}`}
                type="button"
                aria-label="CardLike"
              >
              </button>
              <p className="card__quantity">{likes.length}</p>
            </div>
          </div>
        </div>
      </li>
  );
};

export default Card;