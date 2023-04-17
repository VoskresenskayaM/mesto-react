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
    const [isLoading, setIsLoading] = useState(false)
    const [changeCards, setIsChangeCards] = useState(false)

    useEffect(() => {
        api.getCards()
        .then((res) => {
            setCards(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [changeCards])

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
    }, [isOpen])

    const [currentUser, setCurrentUser] = useState({ name: '', about: '' })

    useEffect(() => {
        api.getUserInfo()
            .then((user) => {
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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

    function handleDeleteCard() {
        setIsLoading(true)
        api.deleteCard(selectedCard._id)
            .then(() => {
                setCards(cards => cards.filter(c => c.id !== selectedCard._id))
                setIsChangeCards(!changeCards)
            })
            .catch((err) =>
                console.log(err))
            .finally(() => {
                closeAllPopups()
                setIsLoading(false)
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
                setIsChangeCards(!changeCards)
            })
            .catch((err) => console.log(err))
    }

    function handleAddNewCard(card) {
        setIsLoading(true)
        api.addNewCard({ item: card })
            .then((newCard) => {
               setCards([...cards, newCard])
               setIsChangeCards(!changeCards)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                closeAllPopups()
                setIsLoading(false)
            })
    }

    function handleUpdateUser(user) {
        setIsLoading(true)
        api.editUserInfo({ item: user })
            .then((newUser) => {
                setCurrentUser(newUser)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                closeAllPopups()
                setIsLoading(false)
            })
    }

    function handleUpdateAvatar(userAvatarLink) {
        setIsLoading(true)
        api.editAvatar({ item: userAvatarLink })
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                closeAllPopups()
                setIsLoading(false)
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
                        isLoading={isLoading}>
                    </EditProfilePopup>
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddNewCard={handleAddNewCard}
                        isLoading={isLoading}>
                    </AddPlacePopup>
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={setIsImagePopupOpen} />
                    <DeleteCardPopup
                        isOpen={isDeletePopupOpen}
                        onClose={setIsDeletePopupOpen}
                        onDeleteCard={handleDeleteCard}
                        isLoading={isLoading}>
                    </DeleteCardPopup>
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}>
                    </EditAvatarPopup>
                </div>
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;

