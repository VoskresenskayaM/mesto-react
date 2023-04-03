import React from "react";
import SubmitButton from "./SubmitButton";

function PopupWithForm(props) {
    const popupClass = `popup  popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
    return (
     <div className={popupClass}  onClick={props.onClose}>
            <div className="popup__container" onClick={(e => e.stopPropagation())}>
                <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose}>
                </button>
                <form name={props.name} className="form" noValidate >
                    <h3 className="form__title">{props.title}</h3>
                    {props.children}
                    <SubmitButton 
                    buttonText={props.buttonText}/>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;