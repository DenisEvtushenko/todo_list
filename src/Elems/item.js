import React from 'react';

class Item extends React.Component {

    // onAddBtnClick =(e)=>{
    //     e.preventDefault();
    //     const itemIndex = this.props.data.findIndex(el.id === id)
    //     if(~itemIndex){
    //         data.splise(itemIndex,1)
    //     }
    // }

    render() {
        const {id,text,status} = this.props.data
        return ( <div
                    className="item"
                    key={id}
                    status={status}
                    id={id}>
                        <p>{text}</p>
                        <button
                        id={id}>
                            Delete
                        </button>
        </div>            
        )
    }
}
export default Item