import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, isLoading, onUpdateUser, onClose }) {

    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [descriptionDirty, setDescriptionDirty] = useState(false)
    const [nameError, setNameError] = useState('Измените имя')
    const [descriptionError, setDescriptionError] = useState('Измените род деятельности')

    const formValid = nameError || descriptionError;

    useEffect(() => {
        if (!isOpen) {
            setNameError('Измените имя')
            setDescriptionError('Измените род деятельности')
            setDescriptionDirty(false)
            setNameDirty(false)
            setName(currentUser.name);
            setDescription(currentUser.about)
        }
    }, [currentUser, isOpen])

    const checkNameHandler = (e) => {
        setName(e.target.value)
        if (!e.target.validity.valid)
            setNameError('Имя должно быть от 2 до 40 символов')
        else setNameError('')
    }

    const checkDescriptionHandler = (e) => {
        setDescription(e.target.value)
        if (!e.target.validity.valid)
            setDescriptionError('Занятие должно быть от 2 до 200 символов')
        else setDescriptionError('')
    }

    const setBlurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'about':
                setDescriptionDirty(true)
                break
        }
    }

    const nameSpanClassName = `form__input-error  name-input-error 
    ${nameDirty && nameError ? 'form__input-error_active' : ''}`
    const aboutSpanClassName = `form__input-error  profession-input-error  
    ${descriptionDirty && descriptionError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='edit'
            title='Редактировать профиль'
            buttonText={isLoading ? 'Сохранение' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            isFormValid={formValid}>
            <input id="name-input" className="form__input  form__input_theme_name" type="text" name="name"
                placeholder="Имя" required minLength="2" maxLength="40"
                value={name} onBlur={e => setBlurHandler(e)} onChange={e => checkNameHandler(e)} />
            <span className={nameSpanClassName}>{nameError}</span>
            <input id="profession-input" className="form__input  form__input_theme_profession" type="text" name="about"
                placeholder="Профессия" required minLength="2" maxLength="200"
                value={description} onBlur={e => setBlurHandler(e)} onChange={e => checkDescriptionHandler(e)} />
            <span className={aboutSpanClassName}>{descriptionError}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;

