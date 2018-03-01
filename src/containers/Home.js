import React from 'react'
import shirt from '../assets/images/shirt.png'

const Home = () => (
  <div className="relative container">
    <div className="mt7 fl">
      <h1 className="fw9 f2">
        Willkomen auf<br />
        der SmartShirt<br />
        website!
      </h1>
      <p className="open-sans f6 fw3">
        Navigieren Sie uber das Menu aben Links zu den verschiedenen Funktionen.
        Viel Spass!
      </p>
    </div>
    <img src={shirt} className="absolute shirt-image" alt="" />
  </div>
)

export default Home
