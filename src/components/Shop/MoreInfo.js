
import React from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainContext from '../../context/MainContext'

function MoreInfo() {

  const { id } = useParams()
  const { allProducts, loggedIn } = useContext(MainContext)
  const nav = useNavigate()

  const singleProduct = allProducts[id];

  const redirect = () => {
    nav('/auth')
  }

  return (
    <div>
      <div>
        <img src={singleProduct.image} alt="" />
      </div>
      <div>
        <h2>{singleProduct.title}</h2>
        <p>{singleProduct.info}</p>
        <p>{singleProduct.price}$</p>
        {loggedIn ? <button>Buy Now</button> : <button onClick={redirect}>Log in to buy</button>}
      </div>
    </div>
  )
}

export default MoreInfo