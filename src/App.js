import React from 'react';
import './App.css';
import './MYtest.js'
import './addbtn.js'
import Addbtn from './addbtn'
import Inputtext from './inputtext'
import Todo from './MYtest'

function App() {
  return (
    <div className="wrapper">
      <div className="header" id='header'>
        <h1>TODOlist</h1>
        <Inputtext/>
        <Addbtn />
      </div>
      <ul id="list">
        <Todo/>
      </ul>
    </div>
  );
}

export default App;