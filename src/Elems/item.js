import React from 'react';
import '../App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
toast.configure({
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
})

class Item extends React.Component {
    state = {
        data: this.props.data,
        editStatus: false,
        text: this.props.data.text,
    }
    onDelBtnClick = (e) => {
        e.preventDefault();
        const {id} = this.props.data
        this.props.delTodos(id)
        toast.error('You delete todo')
    }
    onDoubleClick = (e) => {
        e.preventDefault();
        this.setState({editStatus:true})
    }
    onSaveBtnClick = (e) => {
        const {id,status} = this.props.data
        const {text} = this.state
        if (text == ''|| text.length > 32){
            return;
        }
        this.props.doneTodos(id,text,!status)
        this.setState({editStatus:false})
    }
    changeTextInput = (e) => {
        let text = e.target.value;
        this.setState({text: text})
        console.log(this.state.text)
    }
    changeCheckbox = (e) => {
        const {id,text, status} = this.props.data
        this.props.doneTodos(id,text,status)
    }
    inputKeyUp = (e) => {
        if (e.key === 'Enter') {
        return this.onSaveBtnClick()
        }
    }
    itemClass = (status) => status ? 'item done list-group-item' : 'item undone list-group-item';

    render() {
            const {id,text,status} = this.props.data;
            let editState = this.state.editStatus
            const itemOrEdit = () => {
                if (editState) {
                    return (
                        <div
                            className="itemEdit input-group"
                            onKeyUp={this.inputKeyUp}>
                            <input   
                                type='text'
                                size='10'
                                className='form'
                                aria-describedby="button-addon"
                                value={this.state.text}
                                autoFocus={true}
                                onChange={(e) => this.changeTextInput(e)}/>
                                <div 
                                    className="input-group-append">
                                    <button
                                        id="button-addon"
                                        className="savebtn btn btn-success"
                                        onClick={this.onSaveBtnClick}>
                                    Save
                                    </button>
                                </div>
                        </div>
                    )
                }
                return ( <div
                            className={this.itemClass(status)}
                            id={id}
                            onDoubleClick={this.onDoubleClick}>
                                <input
                                    className='check'
                                    type="checkbox"
                                    checked={this.props.data.status}
                                    onChange={(e) => this.changeCheckbox(e)}/>
                                <label>{text}</label>

                            <button
                                className='delbtn'
                                id={id}
                                onClick={this.onDelBtnClick}>
                            </button>
                </div>
                )
            }
            return ( itemOrEdit())
        }
    }

export default Item