import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setProductToEdit } from '../../../store/generalStore'
import './Edit.css'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function Edit() {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const id = useParams()
  const { isAdmin } = useSelector(state => state.generalSlice)
  const titleRef = useRef()
  const imageRef = useRef()
  const priceRef = useRef()
  const infoRef = useRef()

  const [oldTitleVal, setTitleVal] = useState('')
  const [oldImageVal, setImageVal] = useState('')
  const [oldPriceVal, setPriceVal] = useState('')
  const [oldInfoVal, setInfoVal] = useState('')

  useEffect(() => {

    const editObj = {
      id,
      isAdmin
    }

    socket.emit('editProduct', editObj)

    socket.on('editProduct', data => {
      dispatch(setProductToEdit(data))
      setTitleVal(data.title)
      setImageVal(data.image)
      setPriceVal(data.price)
      setInfoVal(data.info)
    })

  }, [])

  const handleEdit = () => {

    const updatedProduct = {
      id,
      title: oldTitleVal,
      image: oldImageVal,
      price: oldPriceVal,
      info: oldInfoVal,
    }

    if (titleRef.current.value && imageRef.current.value && priceRef.current.value && infoRef.current.value) {
      socket.emit('updateProduct', updatedProduct)
      nav('/shop/page/0')
    } else {
      toast.error("Fields can't be empty!");
      return
    }
  }

  return (
    <div className='container '>

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
      {isAdmin ? <div className="edit-container">
        <h2> EDIT PRODUCT DETAILS</h2>
        <input ref={titleRef} type="text" value={oldTitleVal} onChange={() => setTitleVal(titleRef.current.value)} />
        <input ref={imageRef} type="url" value={oldImageVal} onChange={() => setImageVal(imageRef.current.value)} />
        <input ref={priceRef} type="number" value={oldPriceVal} onChange={() => setPriceVal(priceRef.current.value)} />
        <textarea ref={infoRef} type="text" value={oldInfoVal} onChange={() => setInfoVal(infoRef.current.value)} />
        <button onClick={handleEdit} className='edit-save-changes-btn'>save changes</button>
      </div> : <div className='access'> <p>CAN'T ACCESS</p></div>}
    </div>
  )
}

export default Edit