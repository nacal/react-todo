import React, { useState } from 'react';
import List from './List';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
}

const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();

    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value='追加'
          onChange={(e) => handleOnSubmit(e)}
        />
      </form>
      <List
        todos={todos}
        handleOnEdit={handleOnEdit}
        handleOnCheck={handleOnCheck}
      />
    </>
  )
}

export default App;
