import React from "react";
import Form from './Form'

function PopupWithForm(props) {

    const popupClass = `popup  popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={popupClass} onClick={props.onClose}>
            <div className="popup__container" onClick={(e => e.stopPropagation())}>
                <button className="popup__close-button" type="button" aria-label="закрыть"
                    onClick={props.onClose}></button>
                <Form
                    title={props.title}
                    name={props.name}
                    children={props.children}
                    buttonText={props.buttonText}>
                </Form>
            </div>
        </div>
    )
}

export default PopupWithForm;