import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer/Footer';
import MainContext from './context/MainContext'
import { useEffect, useState } from 'react';
import CartPage from './pages/CartPage';
import axios from 'axios';
import MoreInfo from './components/Shop/MoreInfo';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [currentUserName, setCurrentUserName] = useState(null)
  const [allProducts, setAllProducts] = useState(null)

  const states = {
    loggedIn,
    setLoggedIn,
    showLinks,
    setShowLinks,
    currentUserId,
    setCurrentUserId,
    currentUserName,
    setCurrentUserName,
    isAdmin,
    setIsAdmin,
    allProducts,
    setAllProducts
  }

  useEffect(() => {

    axios.get('http://localhost:4000/all/product')
      .then(resp => {
        setAllProducts(resp.data.data)
      })

    const userData = {
      id: currentUserId,
      email: currentUserName
    }

    axios.post('http://localhost:4000/admin', userData)
      .then(resp => {
        if (resp.data.error === false) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      })
      .catch(error => console.log(error))

  }, [currentUserId, currentUserName])

  return (
    <BrowserRouter>

      <MainContext.Provider value={states}>

        <Navbar />

        <div className="container">


          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/auth' element={<LoginPage />} />
            <Route path='/all/product/:id' element={<MoreInfo />} />

          </Routes>


        </div>

        <Footer />

      </MainContext.Provider>

    </BrowserRouter >
  );
}

export default App;
