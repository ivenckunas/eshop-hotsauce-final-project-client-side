import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {

  const nav = useNavigate()

  return (
    <header>
      <button onClick={() => nav('/shop')}>shop hot sauce</button>
    </header>
  )
}

export default Header