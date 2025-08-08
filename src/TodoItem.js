import React, { useState, useEffect } from 'react';

function TodoItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.todo.text);
    const [editPriority, setEditPriority] = useState(props.todo.priority || 'low');
    
    useEffect(() => {
        setEditText(props.todo.text);
        setEditPriority(props.todo.priority || 'low');
    }, [props.todo.text, props.todo.priority]);

    const handleEditSave = () => {
        if (editText.trim() !== '') {
            props.onEdit(props.todo.id, editText.trim(), editPriority);
            setIsEditing(false);
        }
    };

    const handleEditCancel = () => {
        setEditText(props.todo.text);
        setEditPriority(props.todo.priority || 'low');
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    if (isEditing) {
        return (
            <li className="todoItem editing">
                <div className="editForm">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="editInput"
                        autoFocus
                    />
                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="editPrioritySelect"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <div className="editActions">
                        <button onClick={handleEditSave} className="saveBtn">
                            Save
                        </button>
                        <button onClick={handleEditCancel} className="cancelBtn">
                            Cancel
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li className={`todoItem priority${props.todo.priority ? props.todo.priority.charAt(0).toUpperCase() + props.todo.priority.slice(1) : 'Low'}`}>
            <div className={`priorityIndicator priority${props.todo.priority ? props.todo.priority.charAt(0).toUpperCase() + props.todo.priority.slice(1) : 'Low'}`}></div>
            <input
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.onToggle(props.todo.id)}
            />
            <span className={props.todo.completed ? 'completed' : ''}>
                {props.todo.text}
            </span>
            <span className="priorityLabel">
                {(props.todo.priority || 'low').charAt(0).toUpperCase() + (props.todo.priority || 'low').slice(1)}
            </span>
            <div className="todoActions">
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="editBtn"
                >
                    Edit
                </button>
                <button 
                    onClick={() => props.onDelete(props.todo.id)} 
                    className="deleteBtn"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;