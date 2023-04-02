import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup'
import { useState } from 'react';
import { useEffect } from 'react';
import api from './components/utils/Api'

function App() {

    const [userName, setUserName] = useState()
    const [userDescription, setUserDescription] = useState()
    const [userAvatar, setUserAvatar] = useState()
    const [cards, setCards] = useState([])

    useEffect(()=>{
        api.getAllCardWhithUser()
        .then(([cards, user])=>{
            setUserName(user.name)
            setUserDescription(user.about)
            setUserAvatar(user.avatar)
            setCards(cards)
        })
    },[])
   
    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') closeAllPopups()
        }
        document.addEventListener('keydown', handleEscClose)
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
        if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false)
        if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
        if (isImagePopupOpen) setIsImagePopupOpen(false)
    }

    return (
        <div className="App">
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    name={userName}
                    description={userDescription}
                    avatar={userAvatar}
                    onCardClick={handleCardClick} />
                <Footer />
                <PopupWithForm
                    name='edit'
                    title='Редактировать профиль'
                    buttonText='Сохранить'
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}>
                    <input id="name-input" className="form__input  form__input_theme_name" type="text" name="name" value=""
                        placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="form__input-error name-input-error"></span>
                    <input id="profession-input" className="form__input  form__input_theme_profession" type="text" name="about"
                        value="" placeholder="Профессия" required minLength="2" maxLength="200" />
                    <span className="form__input-error profession-input-error"></span>
                </PopupWithForm>
                <PopupWithForm
                    name='new-card'
                    title='Новое место'
                    buttonText='Создать'
                    isOpen={isAddPlacePopupOpen}
                    onClose ={closeAllPopups}>
                    <input id="place-input" className="form__input  form__input_theme_place" type="text" name="name" value=""
                        placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="form__input-error place-input-error"></span>
                    <input id="link-input" className="form__input  form__input_theme_link" name="link" value=""
                        placeholder="Ссылка на картинку" required type="url" />
                    <span className="form__input-error link-input-error"></span>
                </PopupWithForm>
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose ={closeAllPopups}/>
                <PopupWithForm
                    name='delete-card'
                    title='Вы уверены?'
                    buttonText='Да' />
                <div className="popup  popup_type_delete-card">
                    <div className="popup__container popup__container_theme_whithsubmit">
                        <button className="popup__close-button" type="button" aria-label="закрыть"></button>
                        <div className="popup__question-block">
                            <h3 className="popup__title">Вы уверены?</h3>
                            <button className="popup__button" type="button">Да</button>
                        </div>
                    </div>
                </div>
                <PopupWithForm
                    name='new-avatar'
                    title='Обновить аватар'
                    buttonText='Сохранить'
                    isOpen={isEditAvatarPopupOpen}
                    onClose ={closeAllPopups}>
                    <input id="avatar-input" className="form__input  form__input_theme_avatar" name="link" value=""
                        placeholder="Ссылка на картинку" required type="url" />
                    <span className="form__input-error  avatar-input-error"></span>
                </PopupWithForm>
            </div>
        </div>
    );
}

export default App;

