import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})


    const isOpen = isEditAvatarPopupOpen ||
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        selectedCard.link

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') closeAllPopups()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscClose)
            return () => {
                document.removeEventListener('keydown', handleEscClose)
            }
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen])

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
                    onCardClick={handleCardClick} />
                <Footer />
                <PopupWithForm
                    name='edit'
                    title='Редактировать профиль'
                    buttonText='Сохранить'
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}>
                    <input id="name-input" className="form__input  form__input_theme_name" type="text" name="name" defaultValue=""
                        placeholder="Имя" required minLength="2" maxLength="40" />
                    <span className="form__input-error name-input-error"></span>
                    <input id="profession-input" className="form__input  form__input_theme_profession" type="text" name="about"
                        defaultValue="" placeholder="Профессия" required minLength="2" maxLength="200" />
                    <span className="form__input-error profession-input-error"></span>
                </PopupWithForm>
                <PopupWithForm
                    name='new-card'
                    title='Новое место'
                    buttonText='Создать'
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
                    <input id="place-input" className="form__input  form__input_theme_place" type="text" name="name" defaultValue=""
                        placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="form__input-error place-input-error"></span>
                    <input id="link-input" className="form__input  form__input_theme_link" name="link" defaultValue=""
                        placeholder="Ссылка на картинку" required type="url" />
                    <span className="form__input-error link-input-error"></span>
                </PopupWithForm>
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={setIsImagePopupOpen} />
                <PopupWithForm
                    title='Вы уверены?'
                    buttonText='Да'>
                    <div className="popup  popup_type_delete-card">
                        <div className="popup__container popup__container_theme_whithsubmit">
                            <button className="popup__close-button" type="button" aria-label="закрыть">
                            </button>
                            <div className="popup__question-block">
                                <h3 className="popup__title">Вы уверены?</h3>
                                <button className="popup__button" type="button">Да</button>
                            </div>
                        </div>
                    </div>
                </PopupWithForm>
                <PopupWithForm
                    name='new-avatar'
                    title='Обновить аватар'
                    buttonText='Сохранить'
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}>
                    <input id="avatar-input" className="form__input  form__input_theme_avatar" name="link" defaultValue=""
                        placeholder="Ссылка на картинку" required type="url" />
                    <span className="form__input-error  avatar-input-error"></span>
                </PopupWithForm>
            </div>
        </div >
    );
}

export default App;

