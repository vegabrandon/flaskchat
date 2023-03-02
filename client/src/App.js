import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/test')
  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
