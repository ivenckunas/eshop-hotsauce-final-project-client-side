
import React from 'react'
import './MoreInfo.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCart } from '../../store/generalStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MoreInfo() {

  const { id } = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { allProducts, loggedIn, cart } = useSelector(state => state.generalSlice)

  const singleProduct = allProducts[id];

  const redirect = () => {
    nav('/auth')
  }


  const itemAddedAlert = () => toast.success("Item added to cart");
  const itemIsInCart = () => toast.error("Item is already in a cart");

  const addToCart = () => {
    if (cart.indexOf(singleProduct) > -1) {
      itemIsInCart()
    } else {
      dispatch(setCart([...cart, singleProduct]))
      itemAddedAlert()
    }
  }
  return (
    <div className='container more-info'>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />

      <div>
        <img src={singleProduct.image} alt="" />
      </div>
      <div>
        <h2>{singleProduct.title}</h2>
        <p>{singleProduct.info}</p>
        <p>{singleProduct.price}$</p>
        {loggedIn ? <button onClick={addToCart}>add to cart</button> : <button onClick={redirect}>Log in to buy</button>}
      </div>
    </div>
  )
}

export default MoreInfo