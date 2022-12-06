import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import CartPage from './pages/CartPage';
import axios from 'axios';
import MoreInfo from './components/Shop/MoreInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts, setIsAdmin } from './store/generalStore';
import Header from './components/Header/Header';
import SwiperJs from './components/Swiper/Swiper';

function App() {

  const dispatch = useDispatch()
  const { allProducts, currentUserId, currentUserName } = useSelector(state => state.generalSlice)

  useEffect(() => {

    axios.get('http://localhost:4000/product/all')
      .then(resp => {
        dispatch(setAllProducts(resp.data.data))
      })

    const userData = {
      id: currentUserId,
      email: currentUserName
    }

    axios.post('http://localhost:4000/admin', userData)
      .then(resp => {
        if (resp.data.error === false) {
          dispatch(setIsAdmin(true))
        } else {
          dispatch(setIsAdmin(false))
        }
      })
      .catch(error => console.log(error))

  }, [dispatch, currentUserName, currentUserId])

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/auth' element={<LoginPage />} />
        <Route path='/product/single/:id' element={<MoreInfo />} />
      </Routes>

      <Footer />

    </BrowserRouter >
  );
}

export default App;
