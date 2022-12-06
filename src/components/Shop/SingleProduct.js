import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCart } from '../../store/generalStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProduct({ product, id }) {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const { loggedIn, cart } = useSelector(state => state.generalSlice)


  const addToCart = () => {
    if (cart.indexOf(product) > -1) {
      itemIsInCart()
    } else {
      dispatch(setCart([...cart, product]))
      itemAddedAlert()
    }
  }

  const itemAddedAlert = () => toast.success("Item added to cart");
  const itemIsInCart = () => toast.error("Item is already in a cart");


  return (
    <div className="single-product">

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

      <div className="single-product-image">
        <img src={product.image} alt="" />
      </div>
      <div className="single-product-info">
        <h2>{product.title}</h2>
        <h3>{product.price}$</h3>
        <div className="single-product-btns">
          <button onClick={() => {
            nav(`/product/single/${id}`)
          }}>more info</button>
          {loggedIn ? <button onClick={() => {
            addToCart()
          }
          }>add to cart</button> : ''}
        </div>
      </div>
    </div>
  )
}

export default SingleProduct