import React, { useRef } from 'react'
import './ChatWindow.css'
import { FaRegWindowClose } from 'react-icons/fa'
import { RiSendPlane2Line } from 'react-icons/ri'
import { setShowChat } from '../../store/generalStore'
import { useDispatch } from 'react-redux'
import ScrollToBottom from 'react-scroll-to-bottom';



function ChatWindow() {

  const dispatch = useDispatch()
  const messageRef = useRef()

  const sendChatMessage = () => {
    console.log('chat')
  }

  const closeChat = () => {
    dispatch(setShowChat(false))
  }

  return (
    <div className='live-chat-window '>
      <ScrollToBottom className="live-chat-messages">
        <p>Need help with this product?</p>
      </ScrollToBottom>
      <input ref={messageRef} on type="text" placeholder='enter your message' />
      <RiSendPlane2Line onClick={sendChatMessage} className='live-chat-send' />
      <FaRegWindowClose onClick={closeChat} className='live-chat-close' />
    </div>
  )
}

export default ChatWindow