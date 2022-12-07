
import React from 'react'
import './MoreInfo.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setCart } from '../../../store/generalStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SwiperJs from '../../Home/Swiper/Swiper'
import { useEffect } from 'react'


function MoreInfo() {

  const { id } = useParams()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { allProducts, loggedIn, cart, isAdmin } = useSelector(state => state.generalSlice)
  const singleProduct = allProducts && allProducts.filter(product => { return product._id === id })[0];
  const itemAddedAlert = () => toast.success("Item added to cart");
  const itemIsInCart = () => toast.error("Item is already in a cart");


  useEffect(() => {
    window.scrollTo({
      top: 0, behavior: 'smooth'
    });

  }, [])

  const redirect = () => {
    nav('/auth')
  }

  const addToCart = () => {
    if (cart.indexOf(singleProduct) > -1) {
      itemIsInCart()
    } else {
      dispatch(setCart([...cart, singleProduct]))
      itemAddedAlert()
    }
  }

  const handleEdit = (id) => {
    nav(`/product/edit/${id}`)
  }

  return (
    <div className='container '>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
      {singleProduct && allProducts &&
        <div className="more-info">



          <div className='more-info-img'>

            <img src={singleProduct.image} alt="" />
          </div>
          <div className='more-info-text'>
            <h2>{singleProduct.title}</h2>
            <hr />
            <p>{singleProduct.info}</p>
            <p className='more-info-price'>${singleProduct.price.toFixed(2)}</p>
            {loggedIn ? <button className='more-info-add-btn' onClick={addToCart}>add to cart</button> : <button className='more-info-add-btn' onClick={redirect}>Log in to buy</button>}

            {isAdmin && <button onClick={() => {
              handleEdit(singleProduct._id)
            }} className='more-info-edit-btn'>edit item</button>}
          </div>

        </div>
      }
      <hr />
      <h2>You may also like:</h2>
      {allProducts && <SwiperJs />}
    </div >
  )
}

export default MoreInfo