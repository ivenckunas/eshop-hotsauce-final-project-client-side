import React from "react";
import "./SingleProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../../../store/generalStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct({ product }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, cart } = useSelector((state) => state.generalSlice);

  const addToCart = (item) => {
    if (cart.some((product) => product._id === item._id)) {
      itemIsInCart();
    } else {
      dispatch(setCart([...cart, product]));
      itemAddedAlert();
    }
  };

  const redirectToMoreInfo = (id) => {
    nav(`/product/single/${id}`);
  }

  const itemAddedAlert = () => toast.success("Item added to cart");
  const itemIsInCart = () => toast.error("Item is already in a cart");

  return (
    <div className="single-product">
      <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} draggable theme="dark" />

      <div onClick={() => redirectToMoreInfo(product._id)} className="single-product-image">
        <img src={product.image} alt="" />
      </div>
      <div className="single-product-info">
        <h2 onClick={() => redirectToMoreInfo(product._id)}>{product.title}</h2>
        <h3 onClick={() => redirectToMoreInfo(product._id)}>${product.price.toFixed(2)}</h3>
        <div className="single-product-btns">
          {loggedIn ? (
            <button
              className="single-product-add-btn"
              onClick={() => {
                addToCart(product);
              }}
            >
              add to cart
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
