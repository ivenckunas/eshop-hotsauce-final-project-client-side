import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBars, FaRegWindowClose } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAdmin, setShowLinks } from '../../store/generalStore'
import io from "socket.io-client";
import logo from '../../images/logo.png'

const socket = io("http://localhost:4000");

function Navbar() {

  const dispatch = useDispatch()
  const {
    loggedIn,
    isAdmin,
    showLinks,
    cart,
    currentUserName
  } = useSelector(state => state.generalSlice)


  const showMobileMenu = () => {
    dispatch(setShowLinks(true))
  }

  const closeMobileMenu = () => {
    dispatch(setShowLinks(false))
  }

  const handleLogout = () => {

    socket.emit('logout')

    window.localStorage.clear()
    window.location.href('/')
    dispatch(setIsAdmin(false))

  }


  return (
    <nav>
      <div className='nav-container container'>
        <Link to="/">
          <img className='nav-logo' src={logo} alt="" />
        </Link>
        <div className='nav-links' >
          <div className={showLinks ? 'slide-left show-mobile ' : 'nav-links-dekstop'}>
            <Link onClick={closeMobileMenu} to={'/'}>Home</Link>
            {isAdmin && <Link onClick={closeMobileMenu} to={'/product/add'}>Add product</Link>}
            <Link onClick={closeMobileMenu} to={'/shop/page/0'}>Shop</Link>
            {loggedIn ?
              <Link to={'/cart'}><FiShoppingCart onClick={closeMobileMenu} /> <span className={cart.length > 0 ? 'cart-length' : ''}>{cart.length > 0 && cart.length}</span> </Link> : <Link to={'/auth'} onClick={closeMobileMenu}>Login</Link>}
            {loggedIn ? <Link onClick={() => {
              closeMobileMenu()
              handleLogout()
            }
            } >Logout</Link> : ''}
          </div>
          <div className="nav-links-mobile">
            {showLinks ? <FaRegWindowClose onClick={closeMobileMenu} className='nav-close ' /> : <FaBars onClick={showMobileMenu} className='nav-bars' />}
          </div>
        </div>
      </div>
      {loggedIn && <h4 className='greet-user'> Hello, {currentUserName.split("@")[0].toUpperCase()}</h4>}
    </nav >
  )
}

export default Navbar