import React from 'react';
import Item from './item';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
 
toast.configure()

class ItemList extends React.Component {
  state = {
      filterStatus:'all',
      markAll:true,
      allChkd: 'this',
      doneChkd: '',
      undoneChkd: '',
  }

  delTodos = async (id, _id) => {
      const itemIndex = this.props.data.findIndex(el => el.id === id);
      try {
          const res = await axios.delete('http://localhost:1234/products/'+_id+'/delete');
          if (res.status === 200){
              this.props.data.splice(itemIndex, 1); 
              toast.error('You delete todo'); 
          }; 
      }
      catch (err) {
      };
      this.setState({data:this.props.data});
  };
  
  onUndoneListBtnClick = () => {
      this.setState({
        filterStatus:'undone', 
        allChkd: '', 
        doneChkd: '', 
        undoneChkd: 'this',
      })
  };

  onDoneListBtnClick = () => {
      this.setState({
        filterStatus:'done', 
        allChkd: '', 
        doneChkd: 'this', 
        undoneChkd: ''
      })
  };
  
  onAllListBtnClick = () => {
      this.setState({
        filterStatus:'all', 
        allChkd: 'this', 
        doneChkd: '', 
        undoneChkd: '',
      })
  };

  onMarkAllBtnClick = () => {
      if (this.state.markAll === true){
          this.onMarkAllDoneBtnClick()
      }
      else this.onMarkAllUndoneBtnClick();
  };

  onMarkAllDoneBtnClick = async () => {
      try {
          const res = await axios.put('http://localhost:1234/products/change',{
              status:true
          });
              if (res.status === 200){
                  return this.props.data.map((item) => {
                  return item.status = true;
                  }),
                  this.setState({data:this.props.data, markAll:false}),
                  toast.info('You marcked all as "done"');
              };
          }
          catch (err) {
          };
  };

  onMarkAllUndoneBtnClick = async () => {
      try {
          const res = await axios.put('http://localhost:1234/products/change',{
              status:false
          })
              if (res.status === 200){
                  return this.props.data.map((item) => {
                              return item.status = false
                          }),
                  this.setState({data:this.props.data, markAll:true}),
                  toast.info('You marcked all as "undone"');
              };
      }
      catch (err) {
      };
  }
  
  onDeleteAllDoneBtnClick = () => {
      this.props.deleteAllDone();
      toast.warning('You deleted all "done" todos');
  };

  render() {
      let  filterState = this.state.filterStatus;

      const changeData = () => {
          if (filterState === 'all') {
              const itemsArray = this.props.data.map((item) => {
              return (
                  <Item
                      key={item.id}
                      id={item.id} 
                      data={item}
                      delTodos={this.delTodos}
                      saveTodos={this.props.saveTodos}
                      doneTodos={this.props.doneTodos}/>
                  );   
              });
              return itemsArray;
          }
      else if (filterState === 'undone') {
          const undoneArray = this.props.data.filter(el => el.status === false)
          const undoneData = undoneArray.map((item) => {
              return (
                <Item 
                      key={item.id}
                      id={item.id} 
                      data={item}
                      delTodos={this.delTodos}
                      saveTodos={this.props.saveTodos}
                      doneTodos={this.props.doneTodos}/>
                    );    
          });
          return undoneData;
      }
      else if (filterState === 'done') {
          const doneArray = this.props.data.filter(el => el.status === true)
          const doneData  = doneArray.map((item) => {
              return (
                  <Item 
                      key={item.id}
                      id={item.id} 
                      data={item}
                      delTodos={this.delTodos}
                      saveTodos={this.props.saveTodos}
                      doneTodos={this.props.doneTodos}/>
              )    
          });
          return doneData;
      };
  };
      return ( 
          <div 
          className='list list-group'>
                  <div
                      className='allDoneUndone'>
                      <button
                          className='allDoneBtn'
                          onClick={this.onMarkAllBtnClick}>
                          ⌄
                      </button>
                  </div>
                  {changeData()}
                  <div
                      className='buttons list-group-item'>
                          <p 
                              className='footerP'>
                              All items: {this.props.data.length}</p>
                          <button
                              className="AUDBtn"
                              id={this.state.allChkd}
                              onClick={this.onAllListBtnClick}>
                              All
                          </button>
                          <button
                              className="AUDBtn"
                              id={this.state.undoneChkd}
                              onClick={this.onUndoneListBtnClick}>
                              Active 
                          </button>
                          <button
                              className="AUDBtn"
                              id={this.state.doneChkd}
                              onClick={this.onDoneListBtnClick}>
                              Completed 
                          </button>
                          <button
                              className="AUDBtn"
                              id='clearCompleted'
                              onClick={this.onDeleteAllDoneBtnClick}>
                              Clear completed
                          </button>
                  </div>
                  <div
                      className='footer list-group-item'>
                  </div>  
          </div>
      );
  };
};

export default ItemList
