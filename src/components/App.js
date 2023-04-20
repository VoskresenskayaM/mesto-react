import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'
import { useState } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup.jsx'
import AddPlacePopup from './AddPlacePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup'
import DeleteCardPopup from './DeleteCardPopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {

        api.getAllCardWhithUser()
            .then(([cards, user]) => {
                setCards(cards)
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })

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

    function handleDeleteCardClick(card) {
        setIsDeletePopupOpen(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
        if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false)
        if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
        if (isImagePopupOpen) setIsImagePopupOpen(false)
        if (isDeletePopupOpen) setIsDeletePopupOpen(false)
    }

    const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false)
    const [isLoadingAddNewCard, setIsLoadingAddNewCard] = useState(false)
    const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false)
    const [isLoadingUpdateAvatar, setIsLoadingUpdateAvatar] = useState(false)

    function handleDeleteCard() {
        setIsLoadingDeleteCard(true)
        api.deleteCard(selectedCard._id)
            .then(() => {
                setCards(cards => cards.filter(c => c._id !== selectedCard._id))
                closeAllPopups()
            })
            .catch((err) =>
                console.log(err))
            .finally(() => {
                setIsLoadingDeleteCard(false)
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log(err))
    }

    function handleAddNewCard(card) {
        setIsLoadingAddNewCard(true)
        api.addNewCard({ item: card })
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoadingAddNewCard(false)
            })
    }

    function handleUpdateUser(user) {
        setIsLoadingUpdateUser(true)
        api.editUserInfo({ item: user })
            .then((newUser) => {
                setCurrentUser(newUser)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingUpdateUser(false)
            })
    }

    function handleUpdateAvatar(userAvatarLink) {
        setIsLoadingUpdateAvatar(true)
        api.editAvatar({ item: userAvatarLink })
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoadingUpdateAvatar(false)
            })
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header />
                    <Main
                        setCards={setCards}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleDeleteCardClick}
                        onCardLike={handleCardLike} />
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoadingUpdateUser}>
                    </EditProfilePopup>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddNewCard={handleAddNewCard}
                        isLoading={isLoadingAddNewCard}>
                    </AddPlacePopup>
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={setIsImagePopupOpen} />
                    <DeleteCardPopup
                        isOpen={isDeletePopupOpen}
                        onClose={setIsDeletePopupOpen}
                        onDeleteCard={handleDeleteCard}
                        isLoading={isLoadingDeleteCard}>
                    </DeleteCardPopup>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoadingUpdateAvatar}>
                    </EditAvatarPopup>
                </div>
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;

