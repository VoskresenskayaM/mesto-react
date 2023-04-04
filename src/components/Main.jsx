import React from "react"
import editFotoProfile from '../images/editFotoProfile.svg'
import Card from './Card'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../utils/Api'

function Main(props) {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    const useef = useEffect(() => {
        console.log(useef)
        api.getAllCardWhithUser()
            .then(([cards, user]) => {
                setUserName(user.name)
                setUserDescription(user.about)
                setUserAvatar(user.avatar)
                setCards(cards)
                console.log(cards)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__image-block">
                    <div className="profile-image-contener">
                        <img className="profile__image" src={userAvatar} alt="фото профиля" />
                        <div className="profile__image-overley" onClick={props.onEditAvatar}>
                            <img className="profile__edit-image" src={editFotoProfile} alt="изменение профиля" />
                        </div>
                    </div>
                    <div className="profile__title-block">
                        <h1 className="profile__title">{userName}</h1>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                    <button className="profile__edit" type="button" aria-label="изменить"
                        onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-plus" type="button" aria-label="добавить"
                    onClick={props.onAddPlace}></button>
            </section>
            <section className="gallery" aria-label="галлерея">
                <ul className="gallery__cards">
                    {cards.map((card) => (
                        <Card key={card._id}
                            card={card}
                            onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;

