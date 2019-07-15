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
  };

  change = (e) => {
    let text = e.target.value;
    this.setState({ text: text });
  };

  onAddBtnClick = () => {
    let status = false,
      id = this.generateId();
    const { text } = this.state;
    text.trim();
    if (text === '' || text.length > 32) {
      return;
    };
    this.props.addTodo({
      id,
      text,
      status
    });
    this.setState({ text: '' });
  };

  inputKeyUp = (e) => {
    if (e.key === 'Enter') {
      return this.onAddBtnClick();
    };
  };

  render() {
    return (
      <div
        onKeyUp={this.inputKeyUp}
        className="add_new_item input-group "
      >
        <input
          className='form'
          aria-describedby="button-addon2"
          type='text'
          autoComplete="off"
          placeholder='What needs be done?'
          value={this.state.text}
          onChange={(e) => this.change(e)}
          autoFocus={true}
        />
        <div className="input-group-append">
          <button
            className='addBtn btn btn-light'
            id="button-addon2"
            onClick={this.onAddBtnClick}>
            add
          </button>
        </div>
      </div>
    );
  };
};

export default AddItem
