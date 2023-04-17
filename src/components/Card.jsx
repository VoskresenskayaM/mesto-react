import React from "react";
import delite from '../images/delete.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `gallery__card-heart  ${isLiked && 'gallery__card-heart_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.deleteCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    return (
        <li className="gallery__card">
            {isOwn && <img className="gallery__card-delete" src={delite} alt="удалить" onClick={handleDeleteClick} />}
            <img className="gallery__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="gallery__card-title-block">
                <h2 className="gallery__card-title">{props.card.name}</h2>
                <div className="gallery__card-heart-block">
                    <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick} ></button>
                    <p className="gallery__card-heart-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;

