import React from 'react';
let data = [
    {id: "1", text: '1', status: true }
];
console.log('test',data);
/*
const generateId = () => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    return result;
};
const addElem = (text = '', status = false) => {
    const id = generateId();
    return data.push({ id, text, status });
};

const removeItem = (text) => {
    const itemIndex = data.findIndex(el => el.text === text);
    if (~itemIndex) {
        data.splice(itemIndex, 1);
    }
};
*/
function Todo (itemObject){
    const { id, text } = itemObject;
    return (
        <li id={id}>
            <p>{text}</p>
        </li>
    )
}
export default Todo