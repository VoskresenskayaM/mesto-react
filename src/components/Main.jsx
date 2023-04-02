import React from "react"
import editFotoProfile from '../images/editFotoProfile.svg'
import Card from './Card'

function Main(props) {
    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__image-block">
                    <div className="profile-image-contener">
                        <img className="profile__image" src={props.avatar} alt="фото профиля" />
                        <div className="profile__image-overley" onClick={props.onEditAvatar}>
                            <img className="profile__edit-image" src={editFotoProfile}
                                alt="изменение профиля" />
                        </div>
                    </div>
                    <div className="profile__title-block">
                        <h1 className="profile__title">{props.name}</h1>
                        <p className="profile__subtitle">{props.description}</p>
                    </div>
                    <button onClick={props.onEditProfile} className="profile__edit" type="button" aria-label="изменить"></button>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-plus" type="button" aria-label="добавить"></button>
            </section>
            <section className="gallery" aria-label="галлерея">
                <ul className="gallery__cards">
                    {props.cards.map((card) => (
                        <Card  key={card.createdAt}
                               card={card}
                               onCardClick={props.onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;