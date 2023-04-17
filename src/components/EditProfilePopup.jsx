import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [nameDirty, setNameDirty] = useState(false)
    const [descriptionDirty, setDescriptionDirty] = useState(false)
    const [nameError, setNameError] = useState('Это поле не может быть пустым')
    const [descriptionError, setDescriptionError] = useState('Это поле не может быть пустым')
    const [formValid, setFormValid] = useState(true)
    const [buttonText, setButtonText] = useState('Сохранить')

    useEffect(() => {
        if (nameError || descriptionError || name === '' || description === '') setFormValid(true)
        else setFormValid(false)
    }, [nameError, descriptionError])

    useEffect(() => {
        if (!props.isOpen) {
            setNameError('Измените имя')
            setDescriptionError('Измените род деятельности')
            setDescriptionDirty(false)
            setNameDirty(false)
            setFormValid(true)
            setName(currentUser.name);
            setDescription(currentUser.about)
        }
    }, [currentUser, props.isOpen])

    useEffect(()=>{
        if(props.isLoading) setButtonText('Сохранение')
        else setButtonText('Сохранить')
    },[props.isLoading])

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 40)
            setNameError('Имя должно быть от 2 до 40 символов')
        else setNameError('')
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 200)
            setDescriptionError('Занятие должно быть от 2 до 200 символов')
        else setDescriptionError('')
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'about':
                setDescriptionDirty(true)
                break
        }
    }

    const nameSpanClassName = `form__input-error  name-input-error ${nameDirty && nameError ? 'form__input-error_active' : ''}`
    const aboutSpanClassName = `form__input-error  profession-input-error  ${descriptionDirty && descriptionError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='edit'
            title='Редактировать профиль'
            buttonText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            isFormValid={formValid} >
            <input id="name-input" className="form__input  form__input_theme_name" type="text" name="name"
                placeholder="Имя" 
                value={name} onBlur={e => blurHandler(e)} onChange={e => nameHandler(e)} />
            <span className={nameSpanClassName}>{nameError}</span>
            <input id="profession-input" className="form__input  form__input_theme_profession" type="text" name="about"
                placeholder="Профессия" 
                value={description} onBlur={e => blurHandler(e)} onChange={e => descriptionHandler(e)} />
            <span className={aboutSpanClassName}>{descriptionError}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;

