import React, { useEffect } from "react";
import { useState } from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, isLoading, onAddNewCard, onClose }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [linkDirty, setLinkDirty] = useState(false);
    const [nameError, setNameError] = useState('Это поле не может быть пустым');
    const [linkError, setLinkError] = useState('Это поле не может быть пустым');
    const formValid = nameError || linkError || name === '' || link === '';

    useEffect(() => {
        if (!isOpen) {
            setName('')
            setLink('')
            setNameError('Это поле не может быть пустым')
            setLinkError('Это поле не может быть пустым')
            setLinkDirty(false)
            setNameDirty(false)
        }
    }, [isOpen])

    const checkNameHandler = (e) => {
        setName(e.target.value)
        if (!e.target.validity.valid) setNameError('Название должно быть от 2 до 30 символов')
        else setNameError('')
    }

    const checkLinkHandler = (e) => {
        setLink(e.target.value)
        if (!e.target.validity.valid) setLinkError('Тут должна быть ссылка')
        else setLinkError('')
    }

    const setBlurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'link':
                setLinkDirty(true)
                break
        }
    }

    const nameSpanClassName = `form__input-error place-input-error 
    ${nameDirty && nameError ? 'form__input-error_active' : ''}`

    const linkSpanClassName = `form__input-error link-input-error  
    ${linkDirty && linkError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        e.preventDefault();
        onAddNewCard({
            name: name,
            link: link,
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='new-card'
            title='Новое место'
            buttonText={isLoading ? 'Сохранение' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            isFormValid={formValid}>
            <input id="place-input" className="form__input  form__input_theme_place" type="text" name="name"
                placeholder="Название" required minLength="2" maxLength="40"
                value={name} onBlur={e => setBlurHandler(e)} onChange={e => checkNameHandler(e)} />
            <span className={nameSpanClassName}>{nameError}</span>
            <input id="link-input" className="form__input  form__input_theme_link" name="link"
                placeholder="Ссылка на картинку" required type="url"
                value={link} onBlur={e => setBlurHandler(e)} onChange={e => checkLinkHandler(e)} />
            <span className={linkSpanClassName}>{linkError}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

