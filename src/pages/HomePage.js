import React from 'react'
import { useSelector } from 'react-redux'
import Home from '../components/Home/Home'
import SwiperJs from '../components/Swiper/Swiper'

function HomePage() {

  const { allProducts } = useSelector(state => state.generalSlice)


  return (
    <div>
      <Home />
      {allProducts && <SwiperJs />}
    </div>
  )
}

export default HomePage