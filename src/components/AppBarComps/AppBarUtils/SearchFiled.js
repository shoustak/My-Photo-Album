import { useState, useContext, useEffect } from "react"
import PhotoContext from "../../../context/PhotosContext"

let initialRender = true;
let prevAlbum = []

const SearchFiled = () => {
  const {
    setLoading,
    setFilterMode,
    fetchAllPhotos,
    setLoadMore,
    setCurrentPhotos,
    currentPhotos } = useContext(PhotoContext)
    
    const [terms, setTerms] = useState('')
    
    useEffect(() => {
    if (initialRender) {
      initialRender = false;
    }
    else {
      //enter into filtring mode
      setLoading(true)
      setFilterMode(true)
      setLoadMore(false)

      //hadnling the terms user typed in
      //firstly check if all photos already stored in local storage. if yes- using it
      //otherwise, fetch all photos once and immediately store it and saving further fetching
      const handleFilter = async () => {
        const photosStroage = JSON.parse(localStorage.getItem("allphotos"));
        
        if(photosStroage) {
          prevAlbum = currentPhotos
          const filtredData = await photosStroage.filter(photo => photo.title.includes(terms.toLowerCase().trim()))
          setCurrentPhotos(filtredData)
          setLoading(false)
        }else{
          prevAlbum = currentPhotos
          const { data } = await fetchAllPhotos()
          const filtredData = await data.filter(photo => photo.title.includes(terms.toLowerCase().trim()))
          setCurrentPhotos(filtredData)
          setLoading(false)
        }
      }

      //timer that wait for user end of typing (1.5s)
      //check if the search filed fulfilled or empty
      //if fulfilled, call the handleFilter function- see above
      //when empty, return the previous album was displayed before searching
      let timer = setTimeout(() => {
        if (terms) {
          handleFilter()
        } else {
          setLoading(false)
          setFilterMode(false)
          setLoadMore(true)
          setCurrentPhotos(prevAlbum) 
        }
      }, 1500)

      //cleanup function for timer
      return () => {
        clearTimeout(timer)
      }
    }
  }, [terms])

  return (
    <>
      <input
        type="text"
        id='search-input'
        placeholder='Search Photo'
        value={terms}
        onChange={e => setTerms(e.target.value)}
      />
    </>
  )
}

export default SearchFiled