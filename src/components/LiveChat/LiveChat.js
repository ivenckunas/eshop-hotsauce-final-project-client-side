import React from 'react'
import './LiveChat.css'
import { BsChatRightDotsFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setShowChat } from '../../store/generalStore'
import ChatWindow from './ChatWindow'


function LiveChat() {

  const { showChat } = useSelector(state => state.generalSlice)
  const dispatch = useDispatch()

  const openChat = () => {
    dispatch(setShowChat(true))
  }

  return (
    <div className='chat'>
      < BsChatRightDotsFill onClick={openChat} className="chat-icon" />
      {showChat ? <ChatWindow /> : ''}
    </div >
  )
}

export default LiveChat