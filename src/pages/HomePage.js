import React from 'react'
import { useSelector } from 'react-redux'
import AboutUs from '../components/Home/AboutUs/AboutUs'
import Articles from '../components/Home/Articles/Articles'
import Home from '../components/Home/Home/Home'
import SwiperJs from '../components/Home/Swiper/Swiper'

function HomePage() {

  const { allProducts } = useSelector(state => state.generalSlice)


  return (
    <div>
      <Home />
      <Articles />


      {allProducts && <SwiperJs />}
      <AboutUs />
    </div>
  )
}

export default HomePage