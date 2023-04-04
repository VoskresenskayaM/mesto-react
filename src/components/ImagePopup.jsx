import React from "react";

function ImagePopup(props) {

    const popupClass = `popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={popupClass} onClick={() => props.onClose(false)}>
            <div className="card-popup">
                <button className="popup__close-button" type="button" aria-label="закрыть"></button>
                <figure className="card-popup">
                    <img className="card-popup__image" src={props.card.link} alt={props.card.name}
                        onClick={(e => e.stopPropagation())} />
                    <figcaption>
                        <h2 className="card-popup__title">{props.card.name}</h2>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;

