import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Chat = ({username}) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/messages')
      .then(data => {
        setMessages(data.data);
      })
  }, [])
  const submit = () => {
    axios.post('http://127.0.0.1:5000/messages', {body: message, username})
      .then(data => {
        setMessages(data.data)
      })
  }
  return <>
    <br />
    <div className='flex flex-col w-[50vw] h-[50vh] m-auto justify-evenly overflow-y-scroll overflow-x-hidden'>
    {messages.length ? messages.map((msg) =>
      <div className='flex flex-col border border-black m-auto w-[40vw] rounded-xl'>
        <div className='h-[12vh] w-[40vw]'>
          <h5 className='text-lg'>{msg.body}</h5>
        </div>
        <div className='h-[3vh] w-[40vw] flex flex-row justify-start'>
          <h4 className='text-2xl ml-3'>{msg.username}</h4>
        </div>
      </div>

    ) : <>No Chats</>}
    </div>

    <br />
    <label className='text-white text-2xl' htmlFor="password">Enter a chat message!</label><br />
    <input onChange={(e) => {setMessage(e.target.value)}} name='password' type="text" />
    <br />
    <button onClick={submit} className="bg-white p-2 mt-5 rounded-xl btn">Send</button>
  </>
}

export default Chat;