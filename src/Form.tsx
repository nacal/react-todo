import React, { useState } from 'react';
import { Filter, Todo } from './App';

interface FormProps {
  filter: Filter;
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

  const handleOnEmpty = () => {
    const newTodos = props.todos.filter((todo) => !todo.removed);
    props.setTodos(newTodos);
  }

  return (
    <>
      { props.filter === 'removed' ?
        (
          <button
            onClick={() => handleOnEmpty()}
            disabled={props.todos.filter((todo) => todo.removed).length === 0}
          >
            ゴミ箱を空にする
          </button>
        ) : (
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <input
              type="text"
              value={text}
              disabled={props.filter === 'checked'}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="submit"
              value='追加'
              disabled={props.filter === 'checked'}
              onChange={(e) => handleOnSubmit(e)}
            />
          </form>
        )
      }
    </>
  )
}

export default Form;
