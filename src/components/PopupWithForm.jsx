import React from "react";
import SubmitButton from "./SubmitButton";

function PopupWithForm(props) {
    const popupClass = `popup  popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
    return (
     <div className={popupClass} onClick={props.onClose} >
            <div className="popup__container" >
                <button className="popup__close-button" type="button" aria-label="закрыть"></button>
                <form name={props.name} className="form" noValidate  onClick={(e=>e.stopPropagation())}>
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