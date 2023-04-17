import React, { useEffect } from "react";
import { useState } from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [linkDirty, setLinkDirty] = useState(false)
    const [nameError, setNameError] = useState('Это поле не может быть пустым')
    const [linkError, setLinkError] = useState('Это поле не может быть пустым')
    const [formValid, setFormValid] = useState(true)
    const [buttonText, setButtonText] = useState('Создать')


    useEffect(() => {
        if (nameError || linkError || name === '' || link === '') setFormValid(true)
        else setFormValid(false)

    }, [nameError, linkError])

    useEffect(() => {
        if (!props.isOpen) {
            setName('')
            setLink('')
            setNameError('Это поле не может быть пустым')
            setLinkError('Это поле не может быть пустым')
            setLinkDirty(false)
            setNameDirty(false)
            setFormValid(true)
        }
    }, [props.isOpen])

    useEffect(() => {
        if (props.isLoading) setButtonText('Сохранение')
        else setButtonText('Создать')
    }, [props.isLoading])


    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 30)
            setNameError('Название должно быть от 2 до 30 символов')
        else setNameError('')
    }

    const linkHandler = (e) => {
        setLink(e.target.value)
        const reg = /https?:\/\/\S+/
        if (!reg.test(e.target.value)) setLinkError('Тут должна быть ссылка')
        else setLinkError('')
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'link':
                setLinkDirty(true)
                break
        }
    }

    const nameSpanClassName = `form__input-error place-input-error ${nameDirty && nameError ? 'form__input-error_active' : ''}`
    const linkSpanClassName = `form__input-error link-input-error  ${linkDirty && linkError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddNewCard({
            name: name,
            link: link,
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='new-card'
            title='Новое место'
            buttonText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            isFormValid={formValid}>
            <input id="place-input" className="form__input  form__input_theme_place" type="text" name="name"
                placeholder="Название"
                value={name} onBlur={e => blurHandler(e)} onChange={e => nameHandler(e)} />
            <span className={nameSpanClassName}>{nameError}</span>
            <input id="link-input" className="form__input  form__input_theme_link" name="link"
                placeholder="Ссылка на картинку"
                value={link} onBlur={e => blurHandler(e)} onChange={e => linkHandler(e)} />
            <span className={linkSpanClassName}>{linkError}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

