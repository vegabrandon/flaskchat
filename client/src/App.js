import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './Login';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {

  }, [])
  return (
    <div className="App">

        {isLoggedIn ? <>
          <h1 className='text-white text-[5rem]'>
            Welcome {user.username}!
          </h1>
        </> : <Login />}

    </div>
  );
}

export default App;
