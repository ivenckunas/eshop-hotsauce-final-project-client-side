import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./Shop.css";
import AddProduct from "../AddProduct/AddProduct";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";

function Shop() {

  const { isAdmin, allProducts } = useSelector((state) => state.generalSlice);

  return (
    <div>
      {isAdmin && <AddProduct />}
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
