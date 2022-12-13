import './AddProduct.css'
import React, { useRef } from 'react'
import { setAllProducts } from '../../../store/generalStore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client";
import { useEffect } from 'react';

const socket = io("http://localhost:4000");

function AddProduct() {

  const dispatch = useDispatch()
  const { isAdmin } = useSelector(state => state.generalSlice)
  const nav = useNavigate()
  const imageRef = useRef()
  const titleRef = useRef()
  const priceRef = useRef()
  const infoRef = useRef()

  useEffect(() => {

  }, [])


  const addNewProduct = () => {
    const newProduct = {
      image: imageRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
      info: infoRef.current.value,
      isAdmin
    }


    if (imageRef.current.value && titleRef.current.value && priceRef.current.value && infoRef.current.value) {
      socket.emit('addProduct', newProduct)
      socket.emit('allProducts')
      socket.on('allProducts', data => {
        dispatch(setAllProducts(data))
      })

      setTimeout(() => {
        nav('/shop/page/0')
      }, 1000);

    } else {
      toast.error("Fields can't be empty!");
      return
    }
  }


  return (
    <div className="container ">

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
      {isAdmin ? <div className="add-product-container">
        <h2>ADD NEW PRODUCT</h2>
        <input ref={imageRef} type="url" placeholder='photo' />
        <input ref={titleRef} type="text" placeholder='title' />
        <input ref={priceRef} type="number" placeholder='price' />
        <textarea ref={infoRef} name="" id="" cols="20" rows="5" placeholder='product info'></textarea>
        <button className='add-product-btn' onClick={addNewProduct}>Add new Product</button>
      </div> : <div className='access'> <p>CAN'T ACCESS</p></div>}
    </div>
  )
}

export default AddProduct