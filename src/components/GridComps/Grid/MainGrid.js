import { useContext, useRef, useCallback } from "react"
import PhotoContext from "../../../context/PhotosContext"
import Card from '../CardComps/Card'
import Loader from '../../Notifiers/Loader'
import NoResults from '../../Notifiers/NoResults'
import './MainGrid.css'

const MainGrid = () => {

    const {
        currentPhotos,
        setStartIndex,
        setEndIndex,
        loading,
        loadMore,
        filterMode } = useContext(PhotoContext)

    //check if the last photo at the grid state is visible in range of 200px below
    //if so, the function query the rest of the data(only if there is data to query)
    const watcher = useRef()
    const lastPhoto = useCallback(p => {
        if (loading) return
        if (watcher.current) watcher.current.disconnect()
        watcher.current = new IntersectionObserver(w => {
            if (w[0].isIntersecting && loadMore && !filterMode) {
                setStartIndex(25)
                setEndIndex(50)
            }
        },{rootMargin: "200px"})
        if (p) watcher.current.observe(p)
    }, [loading, loadMore])

    return (
        <>
            {loading && <div className="loader"> <Loader /> </div>}
           
            {!loading && <div className="grid-container">
                {currentPhotos.map((p, index) => {
                    if (currentPhotos.length === index + 1) {
                        return (<div ref={lastPhoto} key={p}><Card cardData={p} /></div>)
                    } else {
                        return <Card key={index} cardData={p} />
                    }})}
            </div>}

            {/*if the user in filtering mode and also didnt found any photos*/}
            {filterMode && currentPhotos.length === 0 && !loading && <div className="loader"> <NoResults /> </div>}
        </>
    )
}

export default MainGrid
