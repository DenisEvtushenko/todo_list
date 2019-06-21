import React from 'react';

class Comp extends React.Component {
    state = {
        imputValue: ""
    }
    change = (event) => {
        console.log('@@@change');
        let text = event.target.value;
        event.preventDefault();
        this.setState({imputValue: text})
    }
    addItem = () => {
        console.log('@@@ADDDDDDDDDDDDD')
    }
    render(){
        console.log('@@@@@@@@@@RENDER')
        return(<div>
                <input   
                    type='text'
                    size='10' 
                    id='textinp'
                    value={this.state.imputValue}
                    onChange={(e) => this.change(e)}>
                </input>
                <button 
                    onClick={this.addItem}
                >add</button>
            </div>
        )
    }
}
export default Comp