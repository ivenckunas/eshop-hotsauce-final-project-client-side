import "./reset.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer/Footer";
import CartPage from "./pages/CartPage";
import MoreInfo from "./components/Shop/MoreInfo/MoreInfo";
import RegisterPage from "./pages/RegisterPage";
import EditPage from "./pages/EditPage";
import { setAllProducts, setCurrentUserId, setCurrentUserName, setIsAdmin, setLoggedIn } from "./store/generalStore";
import io from "socket.io-client";
import AddPage from "./pages/AddPage";

const socket = io("http://localhost:4000");

function App() {
  const dispatch = useDispatch();
  const { cart, currentUserId, currentUserName, productToEdit } = useSelector((state) => state.generalSlice);


  useEffect(() => {

    socket.emit("allProducts");
    socket.on("allProducts", (data) => {
      dispatch(setAllProducts(data));
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setCurrentUserName(userInfo.data.email));
      dispatch(setCurrentUserId(userInfo.data._id));
      dispatch(setLoggedIn(true));
    }

    const userData = {
      id: currentUserId,
      email: currentUserName,
    };

    socket.emit('admin', userData)

    socket.on('admin', () => {
      dispatch(setIsAdmin(true))
    })

  }, [cart, productToEdit, currentUserId, currentUserName, dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/page/:pageId" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/single/:id" element={<MoreInfo />} />
        <Route path="/product/edit/:id" element={<EditPage />} />
        <Route path="/product/add" element={<AddPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
