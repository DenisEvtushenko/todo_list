import React from 'react';
import './App.css';
import AddItem from './Elems/addNewItem'
import ItemList from './Elems/itemList'

let data = [
  {id:"1", text:"111",status: false},
  {id:"2", text:"222",status: true},
  {id:"3", text:"333",status: false}
];
class App extends React.Component {
  state = {
    dataList: data 
}
  addTodos =(array)=>{
    data.push(array)
    const nextTodos = data
    this.setState({dataList:nextTodos})
  }


  render(){
    return (
      <div className="wrapper">
        <div className="header" id='header'>
          <h1>TODOlist</h1>
        </div>
        <AddItem 
          addTodos={this.addTodos}/>
        <ItemList data={this.state.dataList}/>
      </div>
    );
  }
}
export default App;