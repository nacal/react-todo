import React, { useState } from 'react';

interface Todo {
  value: string;
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
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  return (
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
  )
}

export default Form;
