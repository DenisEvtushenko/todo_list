import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import AddItem from './Elems/addNewItem';
import ItemList from './Elems/itemList';
import axios from 'axios';

class App extends React.Component {
  state = {
    dataList: [],
  };

  addTodo = async (newItem) => {
    try {
      const res = await axios.post('http://localhost:1234/products/create',{
        id: newItem.id,
        text: newItem.text,
        status: newItem.status
      });
      if (res.status === 200) {
        toast.info('Added new todo');
        this.setState({dataList: [...this.state.dataList, res.data.result]});
      };
    }
    catch (err) {
      return;
    };
  };

  deleteAllDone = async () => {
    try {
      const res = await axios.delete('http://localhost:1234/products/deleteAllDone')
      if (res.status === 200) {
        let array = this.state.dataList.filter(el => el.status === false);
        this.setState({dataList:array});
      }
    }
    catch (err) {
    };
  };


  componentDidMount () {
    axios.get('http://localhost:1234/products')
    .then(res => {
      const data = res.data;
      this.setState({dataList:data});
    });
  };

  doneTodos = async (id, _id, status) => {
    try {
      const res = await axios.put('http://localhost:1234/products/'+ _id +'/done',{    
        status:!status
        });
        if (res.status === 200) {
            const filteredData = this.state.dataList.map((item) => {
              if (item.id === id) {
                item.status = !item.status 
              } 
              return item
            })
            this.setState({dataList: filteredData});
        };
    }
    catch (err) {
    };
}
  saveTodos = async (id, _id, text) => {
    try {
      const res = await axios.put('http://localhost:1234/products/'+ _id +'/update',{    
        text:text
        });
        if (res.status === 200) {
            const filteredData = this.state.dataList.map((item) => {
              if (item.id === id) {
                item.text = text
              } 
              return item
            })
            this.setState({dataList: filteredData});
        };
    }
    catch (err) {
    };
  };
  
  render () {
    return (
      <div 
        className="wrapper container">
          <div
            className='row'>
              <div
                className='col'>
                  <h1>
                    todos
                  </h1>
              </div>
              <div
                className='col'>
                  <AddItem 
                      addTodo={this.addTodo}/>
              </div>
              <div 
                  className="w-100">
              </div>
              <div
                  className='col'>
                    <ItemList
                      data={this.state.dataList}
                      deleteAllDone={this.deleteAllDone}
                      doneTodos={this.doneTodos}
                      saveTodos={this.saveTodos}/>
              </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover/>
          </div>
      </div>
    );
  };
};

export default App;
