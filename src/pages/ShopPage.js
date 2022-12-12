import React from 'react'
import { useEffect } from 'react';
import Shop from '../components/Shop/Shop/Shop'

function ShopPage() {

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, [])

  return (
    <Shop />
  )
}

export default ShopPage