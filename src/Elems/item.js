import React from 'react';
import '../App.css';

class Item extends React.Component {
    state = {
        data: this.props.data,
        editStatus: false,
        text: ''

    }

    onDelBtnClick = (e) => {
        e.preventDefault();
        const {id} = this.props.data
        this.props.delTodos(id)
    }

    onDoneBtnClick = (e) => {
        e.preventDefault();
        const {id,text, status} = this.props.data
        this.props.doneTodos(id,text,status)
    }

    onEditBtnClick = (e) => {
        e.preventDefault();
        this.setState({editStatus:true})
    }

    onSaveBtnClick = (e) => {
        e.preventDefault();
        const {id,status} = this.props.data
        const {text} = this.state
        this.props.doneTodos(id,text,!status)
        this.setState({editStatus:false})
    }

    change = (e) => {
        e.preventDefault();
        let text = e.target.value;
        this.setState({text: text})
    }

    itemClass = (status) => status ? 'done' : 'undone';

    render() {
            const {id,text,status} = this.props.data;
            let editState = this.state.editStatus
            const itemOrEdit = () => {
                if (editState) {
                    return (
                        <div>
                            <input   
                                type='text'
                                size='10'
                                value={this.state.imputValue}
                                placeholder={text}
                                onChange={(e) => this.change(e)}/>
                            <button
                                onClick={this.onSaveBtnClick}>
                                Save
                            </button>
                        </div>
                    )
                }
                return ( <div
                    className={this.itemClass(status)}
                    id={id}>
                        <p>{text}</p>
                        <button
                            id={id}
                            onClick={this.onDelBtnClick}>
                            Delete
                        </button>
                        <button
                            id={id}
                            onClick={this.onDoneBtnClick}>
                            Mark as {this.itemClass(!status)}
                        </button>
                        <button
                            id={id}
                            onClick={this.onEditBtnClick}>
                            Edit
                        </button>
                </div>
                )
            }
            return ( itemOrEdit())
        }
    }

export default Item

