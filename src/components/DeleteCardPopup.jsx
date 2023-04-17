import React, { useState, useEffect } from 'react'

function DeleteCardPopup(props) {

    const [buttonText, setButtonText] = useState('Да')
    const popupClass = `popup popup_type_delete-card ${props.isOpen ? 'popup_opened' : ''}`;

    useEffect(() => {
        if (props.isLoading) setButtonText('Удаление')
        else setButtonText('Да')
    }, [props.isLoading])

    return (
        <div>
            <div className={popupClass} onClick={() => props.onClose(false)}>
                <div className="popup__container popup__container_theme_whithsubmit">
                    <button className="popup__close-button" type="button" aria-label="закрыть">
                    </button>
                    <div className="popup__question-block">
                        <h3 className="popup__title">Вы уверены?</h3>
                        <button className="popup__button" type="button" onClick={props.onDeleteCard} >{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCardPopup;

