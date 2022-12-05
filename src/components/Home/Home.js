import React from 'react'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import Header from '../Header/Header'
import './Home.css'

function Home() {

  const { currentUserName } = useContext(MainContext)

  return (
    <div className='home-container'>
      <h4>Hello, {currentUserName}</h4>
      <Header />
    </div>
  )
}

export default Home