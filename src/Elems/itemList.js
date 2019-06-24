import React from 'react';
import Item from './item';

class ItemList extends React.Component {
    state = {
        data: this.props.data,
        filterStatus:'all'
    }

    delTodos =(id)=>{
        const itemIndex = this.props.data.findIndex(el => el.id === id);
          this.props.data.splice(itemIndex, 1)
          this.setState({data:this.props.data})
    }

    doneTodos = (id, text, status) => {
        const itemIndex = this.props.data.findIndex(el => el.id === id);
        this.props.data.splice(itemIndex, 1, {id:id, text:text, status:!status})
        this.setState({data:this.props.data})
    }
    
    onUndoneListBtnClick = (e) => {
        e.preventDefault();
        this.setState({filterStatus:'undone'})
    }

    onDoneListBtnClick = (e) => {
        e.preventDefault();
        this.setState({filterStatus:'done'})
    }
    
    onAllListBtnClick = (e) => {
        e.preventDefault();
        this.setState({filterStatus:'all'})
    }
    
    render() {
        
        const itemsArray = this.state.data.map((item) => {
            return (
                <Item 
                    key={item.id}
                    id={item.id} 
                    data={item}
                    delTodos={this.delTodos}
                    doneTodos={this.doneTodos}/>
            )    
        })
        return ( 
            <div 
                className='list'>
                {itemsArray}
                <button
                    onClick={this.onAllListBtnClick}>
                    All</button>
                <button
                    onClick={this.onUndoneListBtnClick}>
                    Undone</button>
                <button
                    onClick={this.onDoneListBtnClick}>
                    Done</button>
            </div>
        )
    }
}
export default ItemList