import React, {useEffect, useState} from "react";
import {api} from "../utils/Api";
import Card from "./Card";

const Main = ({
                handleEditAvatarClick,
                handleAddProfileClick,
                handleEditProfileClick,
                handleCardClick
}) => {
  const [userName, setUserName] = useState(null);
  const [userActivity , setActivity] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUsersInfo()
      .then(res => {
        setUserName(res.name);
        setActivity(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(e => {
        console.log(e);
      });

    api.getInitCards()
      .then(res => {
        console.log(res);
        setCards(res);
      })
  }, []);

  return (
    <main className="main page__main">
      <div className="loader">
        <div className="loader__content"></div>
      </div>
      <div className="content">
        <section className="profile main__profile">
          <div className="profile__avatar">
            <img src={userAvatar} alt="Жак-Ив Кусто" className="profile__img"/>
              <button
                onClick={handleEditAvatarClick}
                className="button  button_type_avatar" type="button" aria-label="editAvatar"
              >
              </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={handleEditProfileClick}
              className="button profile__edit button_type_edit" type="button" aria-label="EditProfile"
            >
            </button>
            <p className="profile__activity">{userActivity}</p>
          </div>
          <button
            onClick={handleAddProfileClick}
            className="button button_type_add profile__add" type="button" aria-label="AddNewCard"
          >
          </button>
        </section>
        <section className="elements main__elements">
          <ul className="elements__list">
            {cards.map(card => (
              <Card
                {...card}
                key={card._id}
                handleCardClick={() => handleCardClick(card.name, card.link)}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Main;