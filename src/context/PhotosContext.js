import { createContext , useState , useEffect} from "react";
import axios from 'axios'

const PhotoContext = createContext()
const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos"

export const PhotoProvider = ({children}) => {
    const [currentAlbum, setCurrentAlbum] = useState(1)
    const [currentPhotos, setCurrentPhotos] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(25)
    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const [filterMode, setFilterMode] = useState(false)


    // set data in the local storage.
    //key name is the word album + the album number, 
    const setLocalStorage = (photos) => {
        const photosStorage = JSON.parse(localStorage.getItem(`album${currentAlbum}`))

        if (photosStorage && photosStorage.length === 25) {
            const newStorage = [...photosStorage, ...photos]
            localStorage.setItem(`album${currentAlbum}`, JSON.stringify(newStorage))
        } else {
            localStorage.setItem(`album${currentAlbum}`, JSON.stringify(photos))
        }

    }

    //fetch all photos just if user search for some value. 
    //in the first time user looking for some value, all photos store in the local storage
    const fetchAllPhotos = async () => {
        const data = await axios.get(PHOTOS_URL)
        localStorage.setItem("allphotos", JSON.stringify(data.data))
        return data
    }


    //firstly checking if we have the whole album in the local storage, if so, get it from there
    //otherwise, this function fetch albums photos
    //setLoadMore indicates if we queried the all album photos
    const fetchPhotos = async () => {
        const photosStroage = JSON.parse(localStorage.getItem(`album${currentAlbum}`));

        if (photosStroage && photosStroage.length === 50) {
            setCurrentPhotos(photosStroage)
            return
        }else{
            const photosArr = [];
            await axios.get(`${PHOTOS_URL}/?albumId=${currentAlbum}&_start=${startIndex}&_end=${endIndex}`)
            .then(({ data }) => {
                data.forEach((p) => photosArr.push(p));
                setCurrentPhotos(oldPhotos => [...oldPhotos, ...photosArr])
                setLoadMore(currentPhotos.length === 0)
                setLocalStorage(data)
            })
        }
    }

    useEffect(()=>{
        fetchPhotos()
    },[startIndex,endIndex,currentAlbum])

    return <PhotoContext.Provider value={{
        currentPhotos,
        loading,
        loadMore,
        filterMode,
        fetchAllPhotos,
        setCurrentPhotos,
        setStartIndex,
        setEndIndex,
        setCurrentAlbum,
        setLoadMore,
        setFilterMode,
        setLoading
    }}>
        {children}
    </PhotoContext.Provider>
}

export default PhotoContext
