import React from 'react'
import SingleProduct from './SingleProduct'
import './Shop.css'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import AddProduct from '../AddProduct/AddProduct'


function Shop() {

  const { isAdmin, allProducts } = useContext(MainContext)



  return (
    <div>
      {isAdmin ? <AddProduct /> : ''}
      <div className="shop  ">
        {allProducts && allProducts.map((product, id) => {
          return <SingleProduct key={id} id={id} product={product} />
        })}
      </div>
    </div>
  )
}

export default Shop