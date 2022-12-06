import React from 'react'
import './Cart.css'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../../store/generalStore'
import { TiDeleteOutline } from 'react-icons/ti'
import { ToastContainer, toast } from 'react-toastify';

function Cart() {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const { cart } = useSelector(state => state.generalSlice)
  const itemRemovedFromCart = () => toast.error("Item removed from cart");

  const totalPrice = cart.reduce(function (total, item) {
    return total + item.price;
  }, 0);

  const removeFromCart = (_id) => {
    const filtered = cart.filter((item) => item._id !== _id)
    dispatch(setCart(filtered))
    if (filtered.length === 0) {
      nav('/shop')
    }
  }

  return (
    <div className='cart'>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />

      <div className="cart-items">
        {cart && cart.map((item, id) => {
          return <div key={id}>
            <img src={item.image} alt="" />
            <p>{item.price}</p>
            <TiDeleteOutline onClick={() => {
              removeFromCart(item._id)
              itemRemovedFromCart()
            }} />
          </div>
        })}
      </div>
      <div className="cart-total-sidebar">
        <h3>items in the cart: {cart.length}</h3>
        <h3>total price: {totalPrice.toFixed(2)}$</h3>
        <button>proceed to checkout</button>
      </div>
    </div>
  )
}

export default Cart