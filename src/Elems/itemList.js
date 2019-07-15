/* eslint-disable no-sequences */
import React from 'react';
import Item from './item';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

toast.configure()

class ItemList extends React.Component {
  state = {
    filterStatus: 'All',
    ismarkAll: true,
  };

  handleDeleteTodos = async (id, _id) => {
    const itemIndex = this.props.data.findIndex(el => el.id === id);
    try {
      const res = await axios.delete('http://localhost:1234/products/' + _id + '/delete');
      if (res.status === 200) {
        this.props.data.splice(itemIndex, 1);
        toast.error('You delete todo');
      };
    }
    catch (err) {
    };
    this.setState({ data: this.props.data });
  };

  changeFilter = (e) => {
    const { id } = e.target
    this.setState({ filterStatus: id, })
  };

  setActive = (value) => {
    return value === this.state.filterStatus ? ' active' : ''
  };

  onMarkAllBtnClick = () => {
    return this.state.ismarkAll ? this.onMarkAllDoneBtnClick() : this.onMarkAllUndoneBtnClick()
  };

  filterData = (filterState) => {
    switch (filterState) {
      case "All":
        return this.props.data;
      case "Active":
        return this.props.data.filter(el => el.status === false);
      case "Completed":
        return this.props.data.filter(el => el.status === true);
      default:
        return this.props.data;
    };
  };

  onMarkAllDoneBtnClick = async () => {
    try {
      const res = await axios.put('http://localhost:1234/products/change', {
        status: true
      });
      if (res.status === 200) {
        return this.props.data.map((item) => {
          return item.status = true
        }),
          this.setState({ data: this.props.data, ismarkAll: false }),
          toast.info('You marcked all as "Completed"');
      };
    }
    catch (err) {
    };
  };

  onMarkAllUndoneBtnClick = async () => {
    try {
      const res = await axios.put('http://localhost:1234/products/change', {
        status: false
      })
      if (res.status === 200) {
        return this.props.data.map((item) => {
          return item.status = false
        }),
          this.setState({ data: this.props.data, ismarkAll: true }),
          toast.info('You marcked all as "Active"');
      };
    }
    catch (err) {
    };
  };

  onDeleteAllDoneBtnClick = () => {
    this.props.deletedAllDone();
    toast.warning('You deleted all completed todos');
  };

  render() {
    let filterState = this.state.filterStatus;
    const filteredArray = this.filterData(filterState);
    const buttonsList = ["All", "Active", "Completed"];

    return (
      <div
        className='list list-group'>
        <div
          className='allDoneUndone'>
          <button
            className='allDoneBtn'
            onClick={this.onMarkAllBtnClick}
          >
            ⌄
          </button>
        </div>
        {filteredArray.map(item => (
          <Item
            key={item.id}
            id={item.id}
            data={item}
            handleDeleteTodos={this.handleDeleteTodos}
            saveTodos={this.props.saveTodos}
            doneTodos={this.props.doneTodos}
          />
        )
        )}
        <div className='buttons list-group-item'>
          <p
            className='footerP'>
            All items: {this.props.data.length}
          </p>
          {buttonsList.map(key => (
            <button
              className={`filterButton${this.setActive(key)}`}
              key={key}
              id={key}
              onClick={this.changeFilter}
            >
              {key}
            </button>
          )
          )}
          <button
            className="filterButton"
            id='clearCompleted'
            onClick={this.onDeleteAllDoneBtnClick}
          >
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
