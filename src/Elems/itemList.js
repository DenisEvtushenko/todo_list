import React from 'react';
import Item from './item';
class ItemList extends React.Component {
    render() {
        const newItem = this.props.data.map(function(item){
            return (
                <Item 
                    className='item'
                    key={item.id}
                    id={item.id} 
                    status={item.status} data={item}/>
            )    
        })
        return ( 
            <div className='list'>
                {newItem}
            </div>
        )
    }
}
export default ItemList