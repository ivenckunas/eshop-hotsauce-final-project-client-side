import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../../store/generalStore';

function Filter() {

  const dispatch = useDispatch()
  const { allProducts } = useSelector(state => state.generalSlice)

  const sortAsc = () => {
    const sortCopy = [...allProducts]
    const sorted = sortCopy.sort((a, b) => (a.price > b.price ? 1 : -1));
    dispatch(setAllProducts(sorted))
  }

  const sortDesc = () => {
    const sortCopy = [...allProducts]
    const sorted = sortCopy.sort((a, b) => (a.price > b.price ? -1 : 1));
    dispatch(setAllProducts(sorted))
  }

  return (
    <div>
      <input type="search" name="" id="" placeholder='search for a product' />
      <h2>sort by : <button onClick={sortAsc}>lower price first</button> <button onClick={sortDesc}>higher price first</button> </h2>
    </div >
  )
}

export default Filter