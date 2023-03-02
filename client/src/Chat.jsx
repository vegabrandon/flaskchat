import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Chat = ({username}) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    const getMessages = () => {
      axios.get('http://127.0.0.1:5000/messages')
        .then(data => {
          setMessages(data.data);
        })
    }
    getMessages();
    const interval = setInterval(() => getMessages(), 1000);
    return () => {clearInterval(interval)}
  }, [])
  const submit = () => {
    axios.post('http://127.0.0.1:5000/messages', {body: message, username})
      .then(data => {
        setMessages(data.data)
      })
  }
  return <>
    <br />
    <div className='flex flex-col w-[60vw] h-[50vh] m-auto mt-12 justify-start overflow-y-scroll overflow-x-hidden text-white'>
    {messages.length ? messages.slice(0).reverse().map((msg) =>
      <div className='flex flex-col border h-[15vh] m-auto w-[50vw] rounded-xl mb-4'>
        <div className='h-[12vh] w-[50vw]'>
          <h5 className='text-lg'>{msg.body}</h5>
        </div>
        <div className='h-[3vh] w-[50vw] flex flex-row justify-start mb-2'>
          <h4 className='text-2xl ml-3'><i class="fa-solid fa-user text-sm mr-1"></i>{msg.username === username ? <b className='text-[lightgreen]'>{msg.username}</b> : msg.username}</h4>
        </div>
      </div>

    ) : <>No Chats</>}
    </div>
    <div className='h-[20vh] flex flex-col justify-center'>
      <div><label className='text-white text-2xl mr-5' htmlFor="password">Enter a chat message!</label>
      <input onChange={(e) => {setMessage(e.target.value)}} name='password' type="text" /></div>
      <div><button onClick={submit} className="bg-white p-2 mt-5 rounded-xl btn">Send</button></div>
    </div>

  </>
}

export default Chat;