import { useState, useContext } from 'react'

import { IoMdArrowDropdown } from 'react-icons/io'
import { IoMdArrowDropright } from 'react-icons/io'

import PhotoContext from '../../../context/PhotosContext'

const Dropdown = () => {
    const {
        setFilterMode,
        setCurrentAlbum,
        setStartIndex,
        setEndIndex,
        setCurrentPhotos } = useContext(PhotoContext)

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("Select Album")

    // if user pick album, update the text accordingly, and querying the relevant album
    const handleAlbumPick = (index) => {
        setText(`Album ${index}`)
        setCurrentAlbum(index)
        setStartIndex(0)
        setEndIndex(25)
        setCurrentPhotos([])
        setFilterMode(false)
    }

    return (
        <div className='dropdown'>
            <div className="dropdown-btn" onClick={e => setOpen(!open)}>
                {text} {open ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
            </div>
            {open && <div className="dropdown-list">
                {[...Array(100)].map((_, index) => {
                    return <div key={index} onClick={() => handleAlbumPick(index + 1)} className="dropdown-item">Album {index + 1}</div>
                })}
            </div>}
        </div>
    )
}

export default Dropdown