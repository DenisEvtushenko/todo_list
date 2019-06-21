import React from 'react';
import './App.css';
import AddItem from './addNewItem'
import ItemList from './itemList'

let data = [
  {id:"1", text:"111"},
  {id:"2", text:"222"},
  {id:"3", text:"333"},
  {id:"4", text:"444"}
];

function App() {
  return (
    <div className="wrapper">
      <div className="header" id='header'>
        <h1>TODOlist</h1>
      </div>
      <AddItem/>
      <ItemList data={data}/>
    </div>
  );
}

export default App;