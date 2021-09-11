import React, { useState } from 'react';
import { Filter, Todo } from './App';

interface FormProps {
  filter: Filter;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  className?: string;
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
    <div className={props.className !== undefined ? props.className : ''}>
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
      {(() => {
        if (props.filter === 'removed') {
          return (
            <button
              onClick={() => handleOnEmpty()}
              disabled={props.todos.filter((todo) => todo.removed).length === 0}
              className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <svg
                className="w-6 h-6"
                fill-rule="evenodd"
                clip-rule="evenodd"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="transparent"
                  fill="#fff"
                  d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"
                />
              </svg>
            </button>
          )
        }
      })()}
    </div>
  )
}

export default Form;
