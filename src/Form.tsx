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

  const disable: boolean = (props.filter === 'checked' || props.filter === 'removed');

  return (
    <>
      {(() => {
        if (props.filter === 'removed') {
          return (
            <button
              onClick={() => handleOnEmpty()}
              disabled={props.todos.filter((todo) => todo.removed).length === 0}
              className="py-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
                />
              </svg>
            </button>
          )
        }
      })()}
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className="flex items-center max-w-xs sm:max-w-md mx-auto bg-white rounded-full"
      >
        <div className="w-full">
          <input
            type="search"
            value={text}
            disabled={disable}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none disabled:opacity-50"
            placeholder="add tasks"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={disable}
            onChange={(e: any) => handleOnSubmit(e)}
            className="flex items-center justify-center w-12 h-12 bg-gray-900 text-gray-100 rounded-full disabled:opacity-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                fill="#fff"
                d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
              />
            </svg>
          </button>
        </div>
      </form >
    </>
  )
}

export default Form;
