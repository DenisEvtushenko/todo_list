import React from 'react';
import '../App.css';

class Item extends React.Component {
    state = {
        data: this.props.data,
        editStatus: false,
        text: '',
    }

    onDelBtnClick = (e) => {
        e.preventDefault();
        const {id} = this.props.data
        this.props.delTodos(id)
    }


    onDoubleClick = (e) => {
        e.preventDefault();
        this.setState({editStatus:true})
    }

    onSaveBtnClick = (e) => {
        const {id,status} = this.props.data
        const {text} = this.state
        this.props.doneTodos(id,text,!status)
        this.setState({editStatus:false})
    }

    changeTextInput = (e) => {
        e.preventDefault();
        let text = e.target.value;
        this.setState({text: text})
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

    itemClass = (status) => status ? 'done' : 'undone';

    render() {
            const {id,text,status} = this.props.data;
            let editState = this.state.editStatus
            const itemOrEdit = () => {
                if (editState) {
                    return (
                        <div
                            onKeyUp={this.inputKeyUp}>
                            <input   
                                type='text'
                                size='10'
                                value={this.state.imputValue}
                                placeholder={text}
                                onChange={(e) => this.changeTextInput(e)}/>
                            <button
                                onClick={this.onSaveBtnClick}>
                                Save
                            </button>
                        </div>
                    )
                }
                return ( <div
                    className={this.itemClass(status)}
                    id={id}
                    onDoubleClick={this.onDoubleClick}>
                        <p>
                            <input 
                                type="checkbox"
                                checked={this.props.data.status}
                                onChange={(e) => this.changeCheckbox(e)}/>
                                {text}
                        </p>
                        <button
                            id={id}
                            onClick={this.onDelBtnClick}>
                            Delete
                        </button>
                </div>
                )
            }
            return ( itemOrEdit())
        }
    }

export default Item