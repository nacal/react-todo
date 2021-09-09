import React, { useState } from 'react';
import List from './List';

interface Todo {
  value: string;
  id: number;
}

const Form = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText('');
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
      <List todos={todos} />
    </>
  )
}

export default Form;
