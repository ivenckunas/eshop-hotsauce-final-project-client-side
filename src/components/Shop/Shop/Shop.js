import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import { useEffect } from "react";
import io from "socket.io-client";
import { setAllProducts } from "../../../store/generalStore";

const socket = io("http://localhost:4000");


function Shop() {

  const dispatch = useDispatch()
  const { allProducts } = useSelector((state) => state.generalSlice);

  useEffect(() => {
    socket.emit('allProducts')
    socket.on('allProducts', data => {
      dispatch(setAllProducts(data))
    })
  }, [])


  return (
    <div>
      <div className="container">
        <Filter />
        <div className="shop ">
          {allProducts &&
            allProducts.map((product, id) => {
              return <SingleProduct key={id} id={id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Shop;
