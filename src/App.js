import React from 'react';
import './App.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddItem from './Elems/addNewItem';
import ItemList from './Elems/itemList';
import axios from 'axios';
import { async } from 'q';

// let data = [];

class App extends React.Component {
  state = {
    dataList: [],
  };

  addTodos = async (newItem) => {
    try {
      const res = await axios.post ('http://localhost:1234/products/create',{
        id:newItem.id,
        text:newItem.text,
        status:newItem.status
      });
     if (res.status == 200) {
       console.log(res)
      // dataList.push(newItem)
      // const nextTodos = data
      toast.info('Added new todo')
      this.setState({dataList: [...this.state.dataList, res.data.result]});
      console.log('afteraDD', this.state.dataList)
     }
    }
    catch (err) {
      console.log('@@@@@@@@@@err', err);
    }
  }

  deleteAllDone = () => {
    let array = this.state.dataList.filter(el => el.status === false)
    this.setState({dataList:array})
  }

  componentDidMount () {
    console.log('CDM')
    axios.get('http://localhost:1234/products')
    .then(res => {
      const data = res.data;
      this.setState({dataList:data});
    });
  };

  doneTodos = async (id, text, status, _id) => {
    try {
        const res = await axios.put('http://localhost:1234/products/'+ _id +'/update',{
            status:!status
        });
        if (res.status == 200){
            const filteredData = this.state.dataList.map((item) => {
              if (item.id === id) {
                item.status = !item.status 
              } 
              return item
            })
            console.log('SSSSSSSSSS', status)
            this.setState({dataList: filteredData});
        }
    }
    catch (err) {
        console.log('@@@@@@@@@@err', err);
    };
    
}
  
  render () {
    console.log('RENDER', this.state.dataList)
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
            addTodos={this.addTodos}/>
            </div>
            <div className="w-100"></div>
            <div
              className='col'>
        <ItemList
            data={this.state.dataList}
            deleteAllDone={this.deleteAllDone}
            doneTodos={this.doneTodos}
            />
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
  }

  
}


export default App;
