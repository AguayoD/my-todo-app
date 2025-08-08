import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all'); 

  
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedNextId = localStorage.getItem('nextId');
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      
      setTodos([
        { id: 1, text: 'Learn React basics', completed: false, priority: 'medium' },
        { id: 2, text: 'Build a TODO app', completed: false, priority: 'high' },
        { id: 3, text: 'Master React hooks', completed: false, priority: 'low' }
      ]);
      setNextId(4);
    }
    
    if (savedNextId) {
      setNextId(parseInt(savedNextId));
    }
  }, []); 

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('nextId', nextId.toString());
  }, [nextId]);

  const addTodo = (text, priority = 'low') => {
    const newTodo = {
      id: nextId,
      text: text,
      completed: false,
      priority: priority
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText, newPriority) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>My TODO App</h1>
      </header>
      <main>
        <AddTodoForm onAddTodo={addTodo} />
        <div className="filtersContainer">
          <div className="searchFilter">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search TODOs..."
              className="searchInput"
            />
          </div>
          <div className="priorityFilter">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="priorityFilterSelect"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
        {filteredTodos.length === 0 ? (
          <p className="noTodos">
            {searchTerm || priorityFilter !== 'all' 
              ? `No TODOs found matching your filters` 
              : 'No TODOs yet. Add one above!'}
          </p>
        ) : (
          <ul className="todoList">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}
        <div className="todoStats">
          <p>
            Total: {todos.length} | 
            Completed: {todos.filter(t => t.completed).length} | 
            Showing: {filteredTodos.length}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;