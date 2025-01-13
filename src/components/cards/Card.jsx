import React from 'react'
import "./Card.css"

const Card = ({card}) => {
  return (
    <div className='city-card col p-4'>
        <div className='d-flex gap-3'>
            <h1>{card?.name}</h1>
            <p className='country p-1 px-2 rounded'>{card?.sys?.country}</p>
        </div>
        <p className='card-temp'>{Math.round(card?.main?.temp)} °C</p>
        <div className='text-center'>
            <img src={`http://openweathermap.org/img/wn/${card?.weather[0]?.icon}@2x.png`} alt="" />
        </div>
        <p className='text-end card-desc mt-2'>{card?.weather[0]?.description}</p>
    </div>
  )
}

export default Card