import React from 'react';
import Item from './item';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { catchClause } from '@babel/types';
 
toast.configure()

class ItemList extends React.Component {
    state = {
        filterStatus:'all',
        markAll:true
    }

    delTodos = async (id, _id) => {
        const itemIndex = this.props.data.findIndex(el => el.id === id);
        try {
            const res = await axios.delete('http://localhost:1234/products/'+_id+'/delete');
            if (res.status == 200){
                this.props.data.splice(itemIndex, 1); 
                toast.error('You delete todo');               
            }; 
        }
        catch (err) {
            console.log('@@@@@@@@@@err', err);
        };
        this.setState({data:this.props.data});
    };
    
    onUndoneListBtnClick = () => {
        this.setState({filterStatus:'undone'})
    }

    onDoneListBtnClick = () => {
        this.setState({filterStatus:'done'})
    }
    
    onAllListBtnClick = () => {
        this.setState({filterStatus:'all'})
    }

    onMarkAllBtnClick = () => {
        if (this.state.markAll == true){
           this.onMarkAllDoneBtnClick()
        }
        else this.onMarkAllUndoneBtnClick()
    }

    onMarkAllDoneBtnClick = () => {
        this.props.data.map((item) => {
            return item.status = true
        })
        this.setState({data:this.props.data,markAll:false})
        toast.info('You marcked all as "done"')
    }

    onMarkAllUndoneBtnClick = () => {
        this.props.data.map((item) => {
            return item.status = false
        })
        this.setState({data:this.props.data,markAll:true})
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
    quantityDoneItems = () => {
        let itemsQuantity = this.props.data.filter(el => el.status === true).length;
        if (itemsQuantity === 1) {
            return itemsQuantity + ' ' + 'item done'
        }
        return itemsQuantity + ' ' + 'items done'
    }

    quantityUndoneItems = () => {
        let itemsQuantity = this.props.data.filter(el => el.status === false).length;
        if (itemsQuantity === 1) {
            return itemsQuantity + " " + "item left"
        }
        return itemsQuantity + ' ' + 'items left'
    }
    
    status_All_buttons = () => {
        if (this.state.filterStatus == 'all'){
            return ( 
                this.state.allChkd = 'this',
                this.state.doneChkd = '',
                this.state.undoneChkd =''
                )
        }
        else if (this.state.filterStatus == 'done') {
            return (
                this.state.allChkd = '',
                this.state.doneChkd = 'this',
                this.state.undoneChkd =''
                )
        }
        else if (this.state.filterStatus == 'undone') {
            return (
                this.state.allChkd = '',
                this.state.doneChkd = '',
                this.state.undoneChkd ='this'
            )
        }
    }

    render() {
        console.log('dete', this.props.data)
        let  filterState = this.state.filterStatus
        this.status_All_buttons()
        const changeData = () => {
            if (filterState === 'all') {
                const itemsArray = this.props.data.map((item) => {
                return (
                    <Item
                        key={item.id}
                        id={item.id} 
                        data={item}
                        delTodos={this.delTodos}
                        doneTodos={this.props.doneTodos}/>
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
                        doneTodos={this.props.doneTodos}/>
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
                        doneTodos={this.props.doneTodos}/>
                )    
            });
            return doneData
        }
    }
        return ( 
            <div 
            className='list list-group '>
                    <div
                        className='allDoneUndone'>
                    <button
                        className='allDoneBtn'
                        onClick={this.onMarkAllBtnClick}>
                        ⌄</button>
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

        )
    }
}
export default ItemList