import React from "react";
import Form from './Form'

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, children, buttonText, isFormValid }) {

    function handleEscClose(evt) {
        if (evt.key === 'Escape') onClose()
    }

    isOpen ? document.addEventListener('keydown', handleEscClose) :
        document.removeEventListener('keydown', handleEscClose)

    const popupClass = `popup  popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={popupClass} onClick={onClose} >
            <div className="popup__container" onClick={(e => e.stopPropagation())}>
                <button className="popup__close-button" type="button" aria-label="закрыть"
                    onClick={onClose}></button>
                <Form
                    onSubmit={onSubmit}
                    title={title}
                    name={name}
                    children={children}
                    buttonText={buttonText}
                    isFormValid={isFormValid}>
                </Form>
            </div>
        </div>
    )
}

export default PopupWithForm;