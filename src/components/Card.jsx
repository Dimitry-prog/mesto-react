import React from "react";
import deleteIcon from "../images/delete.svg";

const Card = ({link, name, likes, handleCardClick}) => {

  const handleClick = () => {
    handleCardClick(link, name);
  }

  return (
    <>
      <li className="elements__item" >
        <div className="card">
          <img src={link} alt={name} className="card__img" onClick={handleClick}/>
          <img src={deleteIcon} alt="удалить" className="card__delete"/>
          <div className="card__footer">
            <h2 className="card__title">{name}</h2>
            <div className="card__stats">
              <button className="button button_type_like card__like" type="button" aria-label="CardLike">
              </button>
              <p className="card__quantity">{likes.length}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Card;