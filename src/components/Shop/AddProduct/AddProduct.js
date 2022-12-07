import './AddProduct.css'
import axios from 'axios';
import React, { useRef } from 'react'

function AddProduct() {


  const imageRef = useRef()
  const titleRef = useRef()
  const priceRef = useRef()
  const infoRef = useRef()

  const addNewProduct = () => {
    const newProduct = {
      image: imageRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
      info: infoRef.current.value
    }

    if (imageRef.current.value && titleRef.current.value && priceRef.current.value && infoRef.current.value)
      axios.post('http://localhost:4000/product/add', newProduct)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
  }


  return (
    <div className="container add-product-container">
      <input ref={imageRef} type="url" placeholder='photo' />
      <input ref={titleRef} type="text" placeholder='title' />
      <input ref={priceRef} type="number" placeholder='price' />
      <textarea ref={infoRef} name="" id="" cols="20" rows="5" placeholder='product info'></textarea>
      <button className='add-product-btn' onClick={addNewProduct}>Add new Product</button>
    </div>
  )
}

export default AddProduct