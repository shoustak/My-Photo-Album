import { useState } from "react"
import Modal from "../Modal/Modal"

const Header = ({ cardProps }) => {
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <div>
        <img src={cardProps.thumbnail} alt="" className='header-img' onClick={()=> setOpenModal(true)}/>
        {openModal && <Modal cardProps={cardProps} closeModal={setOpenModal} />}
    </div>
  )
}

export default Header