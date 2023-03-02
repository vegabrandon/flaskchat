import React, { useState } from 'react';
import axios from 'axios';

const Login = ({setIsLoggedIn, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    <h1 className='text-white text-[5rem]'>Login</h1>
    <div className='h-[50vh] flex flex-col justify-center'>


      <div className='flex flex-col'><label className='text-white text-2xl mb-5' htmlFor="username">Username</label>
      <input onChange={(e) => {setUsername(e.target.value)}} name='username' type="text" className='m-auto w-[15vw]'/></div>

      <div className='flex flex-col mt-5'><label className='text-white text-2xl mb-5' htmlFor="password">Password</label>
      <input onChange={(e) => {setPassword(e.target.value)}} name='password' type="password" className='m-auto  w-[15vw]'/></div>
      </div>
      <div>
        <button onClick={submit} className="bg-white p-2 rounded-xl mr-5 w-[5rem] m-auto btn">Submit</button>
        <button onClick={submit} className="bg-white p-2 rounded-xl w-[5rem] m-auto btn">Signup</button>
      </div>
    </>
  )
}
export default Login;