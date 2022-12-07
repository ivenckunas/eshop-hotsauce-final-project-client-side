import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setProductToEdit, setErrorMessage } from '../../../store/generalStore'
import './Edit.css'

function Edit() {

  const { productToEdit, errorMessage } = useSelector(state => state.generalSlice)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const id = useParams()
  const titleRef = useRef()
  const imageRef = useRef()
  const priceRef = useRef()
  const infoRef = useRef()

  useEffect(() => {
    axios.post(`http://localhost:4000/product/edit/${id}`, id)
      .then(response => {
        const { data: { data } } = response
        dispatch(setProductToEdit(data))
      })
      .catch(error => console.log(error))
  }, [])


  const handleEdit = () => {
    const updatedProduct = {
      id,
      title: titleRef.current.value,
      image: imageRef.current.value,
      price: priceRef.current.value,
      info: infoRef.current.value,
    }

    if (titleRef.current.value && imageRef.current.value && priceRef.current.value && infoRef.current.value)
      axios.post('http://localhost:4000/product/update', updatedProduct)
        .then(response => {
          if (response.data.error === false) {
            nav('/shop')
          }
        }
        )
        .catch(error => console.log(error))

  }



  return (
    <div className='container edit-container'>

      <input ref={titleRef} type="text" placeholder={productToEdit.title} />
      <input ref={imageRef} type="url" placeholder={productToEdit.image} />
      <input ref={priceRef} type="number" placeholder={productToEdit.price} />
      <textarea ref={infoRef} type="text" placeholder={productToEdit.info} />
      <button onClick={handleEdit} className='edit-save-changes-btn'>save changes</button>
    </div>
  )
}

export default Edit