import './Modal.css'
import { FaTimes } from 'react-icons/fa'

const Modal = ({ cardProps , closeModal }) => {
  return (
    <div className='modalBg'>
      <div className="modalContainer">
        <button className='modal-btn' onClick={()=> closeModal(false)}>
          <FaTimes style={{color: "var(--card-title)"}} />
        </button>
        <div className="modal-photo">
        <img className="photo" src={cardProps.img} alt={cardProps.title} />
        </div>
        <div className="modal-title">
          <h1 className='title'>{cardProps.title}</h1>
        </div>
        <div className="modal-info">
          <p className='album-num'>Album Number: {cardProps.album}</p>
          <p className='album-id'>Photo ID: {cardProps.id}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal