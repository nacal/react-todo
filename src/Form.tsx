import React, { useState } from 'react';
import { Todo } from './App';

interface FormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Form = (props: FormProps) => {
  const [text, setText] = useState<string>('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();

    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    props.setTodos([newTodo, ...props.todos]);
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
