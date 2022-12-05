import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { FaBars, FaRegWindowClose } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import axios from 'axios'


function Navbar() {

  const nav = useNavigate()

  const { loggedIn, showLinks, setShowLinks, setLoggedIn, setIsAdmin } = useContext(MainContext)

  const showMobileMenu = () => {
    setShowLinks(true)
  }

  const closeMobileMenu = () => {
    setShowLinks(false)
  }

  const handleLogout = () => {
    axios.post('http://localhost:4000/logout')
    setLoggedIn(false)
    setIsAdmin(false)
    nav('/')
    nav(0)
  }

  return (
    <nav>
      <div className='nav-container container'>
        <Link to="/">Logo</Link>
        <div className='nav-links' >

          <div className={showLinks ? 'slide-left show-mobile ' : 'nav-links-dekstop'}>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            {loggedIn ? <Link to={'/cart'}><FiShoppingCart /></Link> : <Link to={'/auth'}>Login</Link>}
            {loggedIn ? <Link onClick={handleLogout}>Logout</Link> : ''}
          </div>
          <div className="nav-links-mobile">
            {showLinks ? <FaRegWindowClose onClick={closeMobileMenu} className='nav-close ' /> : <FaBars onClick={showMobileMenu} className='nav-bars' />}
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar