import React, { useState } from "react"
import  styles from "./Modal.module.css"
import Button from "../Button"
export const ModalContext = React.createContext()

export const ModalProvider = ({ children, addToWatchedMovies, removeMovieFromList, movies, setMovies, watchedMovies, setWatchedMovies }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [modalTitle, setModalTitle] = useState(null)
    const [isModalClosing,  setIsModalClosing] = useState(false)


    const openModal = ( title, content) => {
        setModalContent(content)
        setIsModalOpen(true)
        setModalTitle(title)
      }

      const closeModal = () => {
        setIsModalOpen(false)
        setModalContent(null)
        setModalTitle(null)
        setIsModalClosing(true)
      }

      const showDetails = (movie) => {
        openModal( movie.title,
          <>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ipsam alias, odit maiores reiciendis totam rem. Nemo repellendus voluptatibus commodi!</p>
            <div className={styles.modalFooter}>
          <Button onclick={closeModal}>Ок</Button>
          </div> 
          </>
        )
      }
    
      const showViewedConfirmation = (movie, list, setList) => {
        openModal( 'Добавить в просмотренные?',
          <>
            <p>Вы добавляете: <strong>{movie.title}</strong> в просмотренные</p>
            <div className={styles.modalFooter}>
            <Button onclick={() => confirmViewed (movie, list, setList)}>Да</Button>
            <Button onclick={() => showDeleteConfirmation(movie, list, setList)}>Нет</Button>
            </div>
          </>
        )
      }
      const showDeleteConfirmation = (movie, list, setList) => {
        openModal('Удалить фильм?',
          <>
            <p>Вы удаляете: <strong>{movie.title}</strong> из текущего списка</p>
            <div className={styles.modalFooter}>
            <Button onclick={() => confirmDelete(movie, list, setList)}>Да</Button>
            <Button onclick={closeModal}>Нет</Button>
            </div>
          </>
        )
        console.log(watchedMovies);
      }
      const confirmViewed =  (movie, list, setList) => {
        addToWatchedMovies(movie)
        closeModal()
        showDeleteConfirmation(movie, list, setList)
      }
    
      const confirmDelete = (movie, list, setList) => {
        removeMovieFromList(movie, list, setList)
        closeModal();
      };
    

      return (
        <ModalContext.Provider value={{ isModalClosing, isModalOpen,modalTitle, modalContent, openModal, closeModal,
         showDetails, showViewedConfirmation: (movie)=>showViewedConfirmation(movie, movies, setMovies),
          showDeleteConfirmation,
          showWatchedDeleteConfirmation: (movie) => showDeleteConfirmation(movie, watchedMovies, setWatchedMovies) }}>
          {children}
        </ModalContext.Provider>
      )
}