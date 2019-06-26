import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
toast.configure()

class AddItem extends React.Component {
    state = {
          id: '',
        text: '',
      }

    generateId = () => {
        let result = '',
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        return result;
    }

    change = (e) => {
        e.preventDefault();
        let text = e.target.value;
        this.setState({text: text})
    }

    onAddBtnClick =(e)=>{
        let status = false
        let id = this.generateId();
        const {text} = this.state
        this.props.addTodos({
            id,
            text,
            status
        })
        toast.info('Added new todo')
    }

    inputKeyUp = (e) => {
        if (e.key === 'Enter') {
        return this.onAddBtnClick()
        }
    }

    render(){
        return(<div
                    onKeyUp={this.inputKeyUp}
                    className="add_new_item input-group mb-3">
                    <input   
                        className='form-control'
                        aria-describedby="button-addon2"
                        type='text'
                        size='10' 
                        id='textinp'
                        value={this.state.imputValue}
                        onChange={(e) => this.change(e)}/>
                    <div 
                        className="input-group-append">
                        <button 
                            className='btn btn-primary'
                            id="button-addon2"
                            onClick={this.onAddBtnClick}>
                            add
                        </button>
                    </div>
            </div>
        )
    }
}


export default AddItem