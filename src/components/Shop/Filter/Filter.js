import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../../../store/generalStore';
import './Filter.css'


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
    <div className='filter-container'>
      <input className='filter-searchbar' type="search" name="" id="" placeholder='search for a product' />
      <small>
        <button onClick={sortAsc}>lower price first</button>
        <button onClick={sortDesc}>higher price first</button>
      </small>
    </div >
  )
}

export default Filter