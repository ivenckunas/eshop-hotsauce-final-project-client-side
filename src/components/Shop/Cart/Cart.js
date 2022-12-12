import React, { useEffect } from 'react'
import './Cart.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { setAllProducts, setCart } from '../../../store/generalStore'
import { TiDeleteOutline } from 'react-icons/ti'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const socket = io("http://localhost:4000");

function Cart() {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const { cart } = useSelector(state => state.generalSlice)
  const itemRemovedFromCart = () => toast.error("Item removed from cart");

  const removeFromCart = (_id) => {
    const filtered = cart.filter((item) => item._id !== _id)
    dispatch(setCart(filtered))
    if (filtered.length === 0) {
      localStorage.removeItem('cart')
    }
  }


  useEffect(() => {
    socket.emit('allProducts')
    socket.on('allProducts', data => {
      dispatch(setAllProducts(data))
    })
  }, [cart, dispatch])




  return (
    <div className='cart-container container'>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />

      <div className="cart-items">
        {!cart.length && <h2>Cart is empty</h2>}
        {cart && cart.map((item, id) => {
          return <div className='cart-item-card' key={id}>
            <img src={item.image} alt="cart item of hot sauce" />
            <p>{item.title}</p>
            <p className='cart-item-price'>${(item.price).toFixed(2)}</p>
            <TiDeleteOutline className='cart-item-remove-btn' onClick={() => {
              removeFromCart(item._id)
              itemRemovedFromCart()
            }} />
          </div>
        })}
        {cart.length > 0 &&
          <div className="cart-total-sidebar">
            <h3>items in the cart: <span>{cart.length}</span></h3>
            <h3>total price: <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span> </h3>
            <button className='cart-checkout-btn'>Checkout with :</button>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
              <PayPalButtons style={{ layout: "horizontal" }} />
            </PayPalScriptProvider>
          </div>
        }
      </div>
    </div>
  )
}

export default Cart