import React from "react";
import  delite from '../images/delete.svg'

function Card( props) {

    function handleClick() {
        props.onCardClick(props.card);
      } 
           
    return (
        <li className="gallery__card">
            <img className="gallery__card-delete" src={delite} alt="удалить" />
            <img className="gallery__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="gallery__card-title-block">
                <h2 className="gallery__card-title">{props.card.name}</h2>
                <div className="gallery__card-heart-block">
                    <button className="gallery__card-heart" type="button" aria-label="лайк"></button>
                    <p className="gallery__card-heart-count"></p>
                </div>
            </div>
        </li>
    )
}
 
export default Card;