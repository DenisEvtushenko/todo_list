const changeData = () => {
    if ({filterStatus: 'all'}) {
        const itemsArray = this.state.data.map((item) => {
            return (
                <Item 
                    key={item.id}
                    id={item.id} 
                    data={item}
                    delTodos={this.delTodos}
                    doneTodos={this.doneTodos}/>
            )    
        })
    return itemsArray
    }
    else if ({filterStatus: 'undone'}) {
        const undoneData = this.state.data.filter(el => el.status === false).map((item) => {
            return (
                <Item 
                    key={item.id}
                    id={item.id} 
                    data={item}
                    delTodos={this.delTodos}
                    doneTodos={this.doneTodos}/>
            )    
        });
    return undoneData
    }
    else if ({filterStatus: 'done'}) {
        const doneData = this.state.data.filter(el => el.status === true).map((item) => {
            return (
                <Item 
                    key={item.id}
                    id={item.id} 
                    data={item}
                    delTodos={this.delTodos}
                    doneTodos={this.doneTodos}/>
            )    
        });
    return doneData
    }
}