import React from 'react';
 
class AddItem extends React.Component {
    state = {
        imputValue: ""
    }
    change = (event) => {
        this.setState({imputValue: event.target.value})
    }

    render(){        
        return(<div>
                <input   
                    type='text'
                    size='10' 
                    id='textinp'
                    value={this.state.imputValue}
                    onChange={(e) => this.change(e)}>
                </input>
                <button>
                    add
                </button>
            </div>
        )
    }
}


export default AddItem