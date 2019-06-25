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
    
    onUndoneListBtnClick = () => {
        this.setState({filterStatus:'undone'})
    }

    onDoneListBtnClick = () => {
        this.setState({filterStatus:'done'})
    }
    
    onAllListBtnClick = () => {
        this.setState({filterStatus:'all'})
    }

    onMarkAllDoneBtnClick = () => {
        this.props.data.map((item) => {
            return item.status = true
        })
        this.setState({data:this.props.data})
    }

    onMarkAllUndoneBtnClick = () => {
        this.props.data.map((item) => {
            return item.status = false
        })
        this.setState({data:this.props.data})
    }

    onDeleteAllBtnClick = () => {
        let dataLength = this.props.data.length
        this.props.data.splice(0, dataLength)
        this.setState({data:this.props.data})
    }
    
    onDeleteAllDoneBtnClick = () => {
        this.props.deleteAllDone()        
    }

    render() {
        let  filterState = this.state.filterStatus
        const changeData = () => {
            if (filterState === 'all') {
                const itemsArray = this.props.data.map((item) => {
                return (
                    <Item 
                        key={item.id}
                        id={item.id} 
                        data={item}
                        delTodos={this.delTodos}
                        doneTodos={this.doneTodos}/>
                    )    
                })
                return itemsArray
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
                        doneTodos={this.doneTodos}/>
                     )    
            });
            return undoneData
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
                        doneTodos={this.doneTodos}/>
                )    
            });
            return doneData
        }
    }
        return ( 
            <div 
                className='list'>
                {changeData()}
                    <button
                        onClick={this.onMarkAllDoneBtnClick}>
                        Mark all "done"</button>
                    <button
                        onClick={this.onMarkAllUndoneBtnClick}>
                        Mark all "undone"</button>    
                    <button
                        onClick={this.onAllListBtnClick}>
                        All</button>
                    <button
                        onClick={this.onUndoneListBtnClick}>
                        Undone</button>
                    <button
                        onClick={this.onDoneListBtnClick}>
                        Done</button>
                    <button
                        onClick={this.onDeleteAllBtnClick}>
                        Delete all</button>
                    <button
                        onClick={this.onDeleteAllDoneBtnClick}>
                        Delete all "done"</button>
                    <p>
                        All todos:
                        {this.props.data.length}
                    </p>
                    <p>
                        Done todos:
                        {this.props.data.filter(el => el.status === true).length}
                    </p>
                    <p>
                        Undone todos:
                        {this.props.data.filter(el => el.status === false).length}
                    </p>
            </div>
        )
    }
}
export default ItemList