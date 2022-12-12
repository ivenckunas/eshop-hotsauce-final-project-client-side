import React from 'react'
import { useEffect } from 'react';
import Cart from '../components/Shop/Cart/Cart'

function CartPage() {

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, [])

  return (
    <Cart />
  )
}

export default CartPage