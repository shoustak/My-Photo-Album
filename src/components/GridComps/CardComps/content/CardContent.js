import '../Card.css'

const CardContent = ({cardProps}) => {
  return (
    <div className='card-content-div'>
      <div className="header-id">
        <h1 className='card-title'>{cardProps.title}</h1>
        <small className='card-id' style={{ display: "block" }}>id:{cardProps.id}</small>
      </div>
      <input className='card-url' type="text" disabled value={cardProps.img} />
    </div>
  )
}

export default CardContent