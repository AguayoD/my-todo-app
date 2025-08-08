import React, { useState } from 'react';

function AddTodoForm(props) {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      props.onAddTodo(inputText.trim(), priority);
      setInputText('');
      setPriority('low');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addTodoForm">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new TODO..."
        className="todoInput"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="prioritySelect"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" className="addBtn">
        Add TODO
      </button>
    </form>
  );
}

export default AddTodoForm;