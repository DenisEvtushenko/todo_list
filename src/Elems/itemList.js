import React from 'react';
import Item from './item';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
toast.configure()

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
        toast.info('You marcked all as "done"')
    }

    onMarkAllUndoneBtnClick = () => {
        this.props.data.map((item) => {
            return item.status = false
        })
        this.setState({data:this.props.data})
        toast.info('You marcked all as "undone"')
    }

    onDeleteAllBtnClick = () => {
        let dataLength = this.props.data.length
        this.props.data.splice(0, dataLength)
        this.setState({data:this.props.data})
        toast.error('You deleted all todos')
    }
    
    onDeleteAllDoneBtnClick = () => {
        this.props.deleteAllDone()  
        toast.warning('You deleted all "done" todos')      
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
                className='list list-group-item'>
                {changeData()}
                    <button
                        className='btn btn-outline-info'
                        onClick={this.onMarkAllDoneBtnClick}>
                        Mark all "done"</button>
                    <button
                        className='btn btn-outline-info'
                        onClick={this.onMarkAllUndoneBtnClick}>
                        Mark all "undone"</button>    
                    
                    <div 
                        class="btn-group" 
                        role="group" 
                        aria-label="Basic example">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={this.onAllListBtnClick}>
                            All
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={this.onUndoneListBtnClick}>
                            Undone
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={this.onDoneListBtnClick}>
                            Done
                        </button>
                    </div>
                    <button
                        className="btn btn-outline-danger"
                        onClick={this.onDeleteAllBtnClick}>
                        Delete all</button>
                    <button
                        className="btn btn-outline-warning"
                        onClick={this.onDeleteAllDoneBtnClick}>
                        Delete all "done"</button>
                    <div>
                        <span 
                        class="badge badge-secondary">
                        All todos:
                        {this.props.data.length}
                        </span>
                        <span 
                        class="badge badge-secondary">
                        Done todos:
                        {this.props.data.filter(el => el.status === true).length}
                        </span>
                        <span 
                        class="badge badge-secondary">
                        Undone todos:
                        {this.props.data.filter(el => el.status === false).length}
                        </span>                   
                    </div>
            </div>
        )
    }
}
export default ItemList