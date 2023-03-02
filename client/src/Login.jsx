import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Login = ({setIsLoggedIn, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [signupPassword, setSignupPassword] = useState('')
  const [signupUsername, setSignupUsername] = useState('')

  var signupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
    content: {
      position: "absolute",
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      borderRadius: '20px',
      margin: "auto",
      width: "70vw",
      maxWidth: '480px',
      bottom: "45vh",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      outline: "none",
      padding: "20px",

    }
  };

  const submit = () => {
    axios.post('http://127.0.0.1:5000/login', {username, password})
      .then(data => {
        setIsLoggedIn(true);
        setUser(data.data)
      })
      .catch(err => {
        alert('Incorrect Login')
      })
  }
  return (<>
    <Modal
      isOpen={modalOpen}
      appElement={document.getElementById('App')}
      style={signupStyles}
    >
      <h2 className='text-2xl'><b>Signup</b></h2>
        <h4>Username</h4>
        <input className='' type="text" onChange={e => setSignupUsername(e.target.value)}/>

        <h4>Password</h4>
        <input className='' type="password" onChange={e => setSignupPassword(e.target.value)} />
        <div className='flex-row'>
          <button className='' onClick={() => {}}>Submit</button>
          <button className='' onClick={() => {setModalOpen(false)}}>Close</button>
        </div>
    </Modal>
    <h1 className='text-white text-[5rem]'>Login</h1>
    <div className='h-[50vh] flex flex-col justify-center'>


      <div className='flex flex-col'><label className='text-white text-2xl mb-5' htmlFor="username">Username</label>
      <input onChange={(e) => {setUsername(e.target.value)}} name='username' type="text" className='m-auto w-[15vw]'/></div>

      <div className='flex flex-col mt-5'><label className='text-white text-2xl mb-5' htmlFor="password">Password</label>
      <input onChange={(e) => {setPassword(e.target.value)}} name='password' type="password" className='m-auto  w-[15vw]'/></div>
      </div>
      <div>
        <button onClick={submit} className="bg-white p-2 rounded-xl mr-5 w-[5rem] m-auto btn">
          Submit
        </button>
        <button onClick={() => {setModalOpen(true)}} className="bg-white p-2 rounded-xl w-[5rem] m-auto btn">
          Signup
        </button>
      </div>
    </>
  )
}
export default Login;