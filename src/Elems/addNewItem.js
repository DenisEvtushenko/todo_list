import React from 'react';
 
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
        e.preventDefault();
        let id = this.generateId();
        const {text} = this.state
        this.props.addTodos({
            id,
            text
        })
    }

    render(){
        return(<div>
                <input   
                    type='text'
                    size='10' 
                    id='textinp'
                    defaultValue=''
                    value={this.state.imputValue}
                    onChange={(e) => this.change(e)}
                />
                <button 
                    className='add__btn'
                    onClick={this.onAddBtnClick}>
                    add
                </button>
            </div>
        )
    }
}


export default AddItem