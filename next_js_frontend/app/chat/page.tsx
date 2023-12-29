import React from 'react'

const Chat = () => {
  return (
    <div className='h-[93%] flex items-center justify-center'>
      <div className="chat chat-start">
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">2 hours ago</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
      </div>
    </div>
  )
}

export default Chat