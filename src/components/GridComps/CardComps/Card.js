import Header from './header/Header'
import CardContent from './content/CardContent'

import './Card.css'

const Card = ({ cardData }) => {

  const cardProps = {
    title: cardData.title,
    img: cardData.url,
    thumbnail: cardData.thumbnailUrl,
    album: cardData.albumId,
    id: cardData.id
  }

  return (
    <div className='card'>
        <div className='card-header'>
            <Header cardProps={cardProps} />
        </div>
        <div className='card-content'>
            <CardContent cardProps={cardProps}/>
        </div>
    </div>
  )
}

export default Card