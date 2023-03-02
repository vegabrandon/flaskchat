import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Chat from './Chat';
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
          <Chat username={user.username} />

        </> : <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}

    </div>
  );
}

export default App;
