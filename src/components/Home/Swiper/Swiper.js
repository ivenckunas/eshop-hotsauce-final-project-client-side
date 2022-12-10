import React from 'react'
import './Swiper.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSelector } from 'react-redux';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';


function SwiperJs() {

  const { allProducts } = useSelector(state => state.generalSlice)

  const shuffleProducts = allProducts
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  const swiperArray = shuffleProducts.slice(1, 6)

  const nav = useNavigate()

  const navigateToSingleProduct = (id) => {
    nav(`/product/single/${id}`)
  }


  return (
    <div className="container swiper-container">

      <h2>TODAY'S TOP PICKS:</h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
      >

        {swiperArray.map((item, id) => {
          return <SwiperSlide onClick={() => navigateToSingleProduct(item._id)} key={id} className='single-swiper-item'>
            <img src={item.image} alt="" />
            <h3>${item.price.toFixed(2)}</h3>
          </SwiperSlide>
        })}

      </Swiper>
    </div>
  )
}

export default SwiperJs

