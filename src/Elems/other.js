import React from 'react';
class ItemList extends React.Component {
    render() {
        const newItem = this.props.data.map(function(item){
            return (
                <div key={item.id}
                    id={item.id} 
                    status={item.status}>
                   <p>{item.text}</p>
                </div>
            )    
        })
        return (
               <div>{newItem}</div>
               )
    }
}
export default ItemList