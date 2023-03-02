import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const submit = () => {
    axios.post('localhost:5000/login', {username, password})
      .then(data => {
        
      })
  }
  return (
    <>
      <h1 className='text-white text-[5rem]'>Login</h1>
      <label className='text-white text-2xl' htmlFor="username">Username</label><br />
      <input onChange={(e) => {setUsername(e.target.value)}} name='username' type="text" className='mb-5'/>
      <br />
      <label className='text-white text-2xl' htmlFor="password">Password</label><br />
      <input onChange={(e) => {setPassword(e.target.value)}} name='password' type="text" />
      <br />
      <button onClick={submit} className="bg-white p-2 mt-5 rounded-xl btn">Submit</button>
      <button onClick={submit} className="bg-white p-2 mt-5 rounded-xl ml-2 btn">Signup</button>
    </>
  )
}
export default Login;