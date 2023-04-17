import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useRef, useState, useEffect } from 'react'

function EditAvatarPopup(props) {

    /*const avatarRef = useRef('')*/
    const [link, setLink] = useState('')
    const [linkDirty, setLinkDirty] = useState(false)
    const [linkError, setLinkError] = useState('Это поле не может быть пустым')
    const [formValid, setFormValid] = useState(true)
    const [buttonText, setButtonText] = useState('Сохранить')

    useEffect(() => {
        if (linkError || link === '') setFormValid(true)
        else setFormValid(false)

    }, [linkError])

    useEffect(() => {
        if (!props.isOpen) {
            setLink('')
            setLinkError('Это поле не может быть пустым')
            setLinkDirty(false)
            setFormValid(true)
        }
    }, [props.isOpen])

    useEffect(()=>{
        if(props.isLoading) setButtonText('Сохранение')
        else setButtonText('Сохранить')
    },[props.isLoading])

    const blurHandler = (e) => {

        setLinkDirty(true)
    }

    const linkHandler = (e) => {
        setLink(e.target.value)
        const reg = /https?:\/\/\S+/
        if (!reg.test(e.target.value)) setLinkError('Тут должна быть ссылка')
        else setLinkError('')
    }

    const linkSpanClassName = `form__input-error avatar-input-error ${linkDirty && linkError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        console.log(link)
        e.preventDefault();
        props.onUpdateAvatar({
            link: link
            /*link: avatarRef.current.value*/
        })
    }

    return (
        <PopupWithForm
            name='new-avatar'
            title='Обновить аватар'
            buttonText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isFormValid={formValid}>
            <input id="avatar-input" className="form__input  form__input_theme_avatar" name="link"
                placeholder="Ссылка на картинку"
                value={link} onBlur={e => blurHandler(e)} onChange={e => linkHandler(e)}
                /*ref={avatarRef} */ />
            <span className={linkSpanClassName}>{linkError}</span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup

