import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import { useEffect } from "react";
import io from "socket.io-client";
import { setAllProducts } from "../../../store/generalStore";
import { Link, useParams } from "react-router-dom";

const socket = io("http://localhost:4000");


function Shop() {



  const dispatch = useDispatch()
  const { allProducts } = useSelector((state) => state.generalSlice);

  const { pageId } = useParams()

  useEffect(() => {

    socket.emit('allProducts', pageId)
    socket.on('allProducts', data => {
      dispatch(setAllProducts(data))
    })

  }, [pageId])

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
        <div className="shop-pages">
          <Link to={'/shop/page/0'}>1</Link>
          <Link to={'/shop/page/1'}>2</Link>
          <Link to={'/shop/page/2'}>3</Link>
          <Link to={'/shop/page/3'}>4</Link>
        </div>
      </div>
    </div >
  );
}

export default Shop;
