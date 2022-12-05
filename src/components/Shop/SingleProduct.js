import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../../context/MainContext'

function SingleProduct({ product, id }) {

  const { loggedIn } = useContext(MainContext)
  const nav = useNavigate()

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img src={product.image} alt="" />
      </div>
      <div className="single-product-info">
        <h2>{product.title}</h2>
        <h3>{product.price}$</h3>
        <div className="single-product-btns">
          <button onClick={() => {
            nav(`/all/product/${id}`)
          }}>more info</button>
          {loggedIn ? <button>add to cart</button> : ''}
        </div>
      </div>
    </div>

  )
}

export default SingleProduct