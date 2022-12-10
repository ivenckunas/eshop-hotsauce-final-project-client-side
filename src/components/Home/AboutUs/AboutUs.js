import React from 'react'
import './AboutUs.css'

import logo from '../../../images/aboutUsLogo.png'

function AboutUs() {
  return (
    <div className='container about-container'>
      <h1>SAUCE BOSS</h1>
      <p>
        Our hot sauce online shop was founded with a passion for all things spicy. We have a wide selection of hot sauces from all over the world, each with its own unique flavor and heat level. Whether you're a hot sauce connoisseur or just looking to add some spice to your life, we have something for everyone. We are dedicated to providing high-quality, delicious hot sauces at competitive prices and offer fast, reliable shipping to get your sauce to you as quickly as possible. Thank you for visiting our online shop, and we hope you enjoy our selection of fiery condiments!
      </p>

      <img className='logo' src={logo} alt="" />
    </div>
  )
}

export default AboutUs