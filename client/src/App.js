import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './app/Sidebar.js';
import Header from './app/Header.js';
import Main from './app/Main.js';


function App() {
  return (
    <div>

      <div className="app">
        <Sidebar/>
        <Main/>
      </div>


    </div>
  );
}

export default App;
