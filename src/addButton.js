
const generateId = () => {
    let result = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    return result;
};
const addItem = () => {
    let text = this.props.imputValue,
        id = generateId(),
        status=true;
    return  this.props.data.push({id, text, status}),
            this.props.imputValue = "",
            console.log('additem',data)
}