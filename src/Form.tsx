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
          <form
            onSubmit={(e) => handleOnSubmit(e)}
            className="flex items-center max-w-md mx-auto bg-white rounded-full"
          >
            <div className="w-full">
              <input
                type="search"
                value={text}
                disabled={props.filter === 'checked'}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                placeholder="add tasks"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={props.filter === 'checked'}
                onChange={(e: any) => handleOnSubmit(e)}
                className="flex items-center justify-center w-12 h-12 bg-gray-900 text-gray-100 rounded-full"
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
        )
      }
    </>
  )
}

export default Form;
