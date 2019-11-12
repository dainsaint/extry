import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './app/Header.js';
import Main from './app/Main.js';


function App() {
  return (
    <div>

      <Header/>

      <div className="app">
        <Main/>
      </div>


    </div>
  );
}

export default App;
