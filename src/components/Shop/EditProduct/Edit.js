import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setProductToEdit } from '../../../store/generalStore'
import './Edit.css'

function Edit() {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const id = useParams()
  const titleRef = useRef()
  const imageRef = useRef()
  const priceRef = useRef()
  const infoRef = useRef()

  const [oldTitleVal, setTitleVal] = useState('')
  const [oldImageVal, setImageVal] = useState('')
  const [oldPriceVal, setPriceVal] = useState('')
  const [oldInfoVal, setInfoVal] = useState('')

  useEffect(() => {

    axios.post(`http://localhost:4000/product/edit/${id}`, id)
      .then(response => {
        const { data: { data } } = response
        dispatch(setProductToEdit(data))
        console.log('data ===', data);
        setTitleVal(data.title)
        setImageVal(data.image)
        setPriceVal(data.price)
        setInfoVal(data.info)
      })
      .catch(error => console.log(error))

  }, [])

  const handleEdit = () => {

    const updatedProduct = {
      id,
      title: oldTitleVal,
      image: oldImageVal,
      price: oldPriceVal,
      info: oldInfoVal,
    }

    console.log('updatedProduct ===', updatedProduct);

    if (titleRef.current.value && imageRef.current.value && priceRef.current.value && infoRef.current.value)
      axios.post('http://localhost:4000/product/update', updatedProduct)
        .then(response => {
          if (response.data.error === false) {
            nav('/shop')
            setTitleVal('')
            setImageVal('')
            setPriceVal('')
            setInfoVal('')
          }
        })
        .catch(error => console.log(error))
  }

  return (
    <div className='container edit-container'>
      <h2> EDIT PRODUCT DETAILS</h2>
      <input ref={titleRef} type="text" value={oldTitleVal} onChange={() => setTitleVal(titleRef.current.value)} />
      <input ref={imageRef} type="url" value={oldImageVal} onChange={() => setImageVal(imageRef.current.value)} />
      <input ref={priceRef} type="number" value={oldPriceVal} onChange={() => setPriceVal(priceRef.current.value)} />
      <textarea ref={infoRef} type="text" value={oldInfoVal} onChange={() => setInfoVal(infoRef.current.value)} />
      <button onClick={handleEdit} className='edit-save-changes-btn'>save changes</button>
    </div>
  )
}

export default Edit