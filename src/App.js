import React from 'react';
import './App.css';
import AddItem from './Elems/addNewItem'
import ItemList from './Elems/itemList'

let data = [
  {id:"1", text:"111"},
  {id:"2", text:"222"},
  {id:"3", text:"333"}
];
class App extends React.Component {
  state = {
    dataList: data 
}
  addTodos =(array)=>{
    data.push(array)
    const nextTodos = data
    this.setState({dataList:nextTodos})
    console.log('addtodos2',nextTodos)
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