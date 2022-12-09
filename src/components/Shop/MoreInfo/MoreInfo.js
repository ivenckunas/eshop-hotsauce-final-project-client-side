import "./MoreInfo.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAllProducts, setCart, setShowReviews } from "../../../store/generalStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperJs from "../../Home/Swiper/Swiper";
import axios from "axios";
import { useRef } from "react";
import io from 'socket.io-client'
import LiveChat from "../../LiveChat/LiveChat";


const socket = io('http://localhost:4000');

function MoreInfo() {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { allProducts, loggedIn, cart, isAdmin, showReviews, currentUserName } = useSelector((state) => state.generalSlice);
  const singleProduct =
    allProducts &&
    allProducts.filter((product) => {
      return product._id === id;
    })[0];
  const revievRef = useRef()
  const itemAddedAlert = () => toast.success("Item added to cart");
  const itemIsInCart = () => toast.error("Item is already in a cart");

  const redirect = () => {
    nav("/auth");
  };

  const addToCart = (item) => {
    if (cart.some((product) => product._id === item._id)) {
      itemIsInCart();
    } else {
      dispatch(setCart([...cart, singleProduct]));
      itemAddedAlert();
    }
  };

  const handleEdit = (id) => {
    nav(`/product/edit/${id}`);
  };

  const handleDelete = (id) => {
    const productToDelete = {
      id,
    };
    if (window.confirm("Are you sure want to delete this item?")) {
      axios
        .post("http://localhost:4000/product/delete", productToDelete)
        .then((response) => {
          if (response.data.error === false) nav("/");
        })
        .catch((error) => console.log(error));
    }
  };

  const seeReviews = () => {
    if (showReviews === false) {
      dispatch(setShowReviews(true))
      return
    }
    dispatch(setShowReviews(false))
  }

  const addReview = (product) => {

    const reviewObj = {
      author: currentUserName.split('@')[0].toUpperCase(),
      reviewText: revievRef.current.value,
      addReviewTo: product._id,
    }

    socket.emit('review', reviewObj)

  }

  return (
    <div className="container ">
      <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} draggable theme="dark" />

      {singleProduct && allProducts && (
        <div className="more-info">
          <div className="more-info-img">
            <img src={singleProduct.image} alt="" />
          </div>
          <div className="more-info-text">
            <h2>{singleProduct.title}</h2>
            {loggedIn ? <button className="see-reviews-btn" onClick={seeReviews}>See reviews</button> : <button className="see-reviews-btn" onClick={() => nav('/auth')}>Login to see reviews</button>}
            {showReviews &&

              <div>
                <div className="single-review">

                  {singleProduct.reviews.map((review, id) => {
                    return <p key={id}> <span className="review-author">{review.author}</span>: {review.text}</p>
                  })}

                </div>
                <div className="add-review">
                  <input ref={revievRef} type="text" placeholder="add review" />
                  <button onClick={() => addReview(singleProduct)}>add</button>
                </div>
              </div>
            }

            <hr />
            <p>{singleProduct.info}</p>
            <p className="more-info-price">${singleProduct.price.toFixed(2)}</p>
            {loggedIn ? (
              <button className="more-info-add-btn" onClick={() => addToCart(singleProduct)}>
                add to cart
              </button>
            ) : (
              <button className="more-info-add-btn" onClick={redirect}>
                Log in to buy
              </button>
            )}

            {isAdmin && (
              <div>
                <button
                  onClick={() => {
                    handleEdit(singleProduct._id);
                  }}
                  className="more-info-edit-btn"
                >
                  edit item
                </button>

                <button
                  onClick={() => {
                    handleDelete(singleProduct._id);
                  }}
                  className="more-info-delete-btn"
                >
                  delete item
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <LiveChat />

      <hr />
      <h2>You may also like:</h2>
      {allProducts && <SwiperJs />}
    </div>
  );
}

export default MoreInfo;
