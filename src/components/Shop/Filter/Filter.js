import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../../../store/generalStore';
import './Filter.css'
import io from 'socket.io-client'


const socket = io('http://localhost:4000');

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

  const searchBarFilter = (e) => {

    const searchWord = e.target.value.toLowerCase();

    socket.emit('searchProducts', searchWord)

    socket.on('searchProducts', data => {
      dispatch(setAllProducts(data))

    })

  }




  return (
    <div className='filter-container'>
      <input onChange={searchBarFilter} className='filter-searchbar' type="search" name="" id="" placeholder='search for a product' />
      <small>
        <button onClick={sortAsc}>lower price first</button>
        <button onClick={sortDesc}>higher price first</button>
      </small>
    </div >
  )
}

export default Filter