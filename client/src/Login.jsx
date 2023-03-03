import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import * as te from 'tw-elements';

const Login = ({setIsLoggedIn, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [signupPassword, setSignupPassword] = useState('')
  const [signupUsername, setSignupUsername] = useState('')
  const [showError, setShowError] = useState(false);

  const handleSignup = () => {
    axios.post('http://127.0.0.1:5000/users', {username: signupUsername, password: signupPassword})
      .then(data => {
        setUser(data.data)
        setIsLoggedIn(true);
        setModalOpen(false);
        setShowError(false);
      })
      .catch(err => {
        console.log(err)
        setShowError(true);
      })
  }

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
      <div
        className='flex flex-col justify-evenly h-[100%]'
      >
        <div>
          <h2 className='text-2xl'>
            <b>Signup</b>
          </h2>
        </div>

        <div>
          <h4>Username</h4>
        </div>
        <div>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] m-auto p-1.5' type="text" onChange={e => setSignupUsername(e.target.value)}/>
        </div>
        {showError ? <div><h1 className='text-[red]'>Username already taken</h1></div> : null}
        <div>
          <h4>Password</h4>
        </div>
        <div>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] m-auto p-1.5' type="password" onChange={e => setSignupPassword(e.target.value)} />
        </div>
        <div className='flex-row'>
          <button className='border border-black mr-3 bg-white p-2 mt-5 rounded-xl btn' onClick={handleSignup}>Submit</button>
          <button className='border border-black bg-white p-2 mt-5 rounded-xl btn' onClick={() => {setModalOpen(false)}}>Close</button>
        </div>
      </div>

    </Modal>
    <h1 className='text-white text-[5rem]'>FlaskChat Login</h1>
    <div className='h-[50vh] flex flex-col justify-center'>


      <div className='flex flex-col'><label className='text-white text-2xl mb-5' htmlFor="username">Username</label>
      <input onChange={(e) => {setUsername(e.target.value)}} name='username' type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] m-auto p-1.5'/></div>

      <div className='flex flex-col mt-5'><label className='text-white text-2xl mb-5' htmlFor="password">Password</label>
      <input onChange={(e) => {setPassword(e.target.value)}} name='password' type="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] m-auto p-1.5'/></div>
      </div>
      <div>
        <button onClick={submit} className="bg-white p-2 rounded-xl mr-5 w-[5rem] m-auto btn hover:bg-white/[.4]">
          Submit
        </button>
        <button onClick={() => {setModalOpen(true); setShowError(false)}} className="bg-white p-2 rounded-xl w-[5rem] m-auto btn hover:bg-white/[.4]">
          Signup
        </button>
      </div>
    </>
  )
}
export default Login;