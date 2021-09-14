import React from 'react';
import { Todo, Filter } from './App';

interface ListProps {
  filter: Filter;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  className?: string;
}

const List: React.FC<ListProps> = (props) => {
  const disable: boolean =
    props.filter === 'checked' || props.filter === 'removed';

  const handleOnEdit = (id: number, value: string) => {
    const newTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    props.setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    props.setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    props.setTodos(newTodos);
  };

  const filteredTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul className={props.className !== undefined ? props.className : ''}>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id} className="flex justify-center items-center">
            <input
              type="checkbox"
              disabled={disable}
              checked={todo.checked}
              onChange={() => handleOnCheck(todo.id, todo.checked)}
              className="w-3 h-3 m-3"
            />
            <input
              type="text"
              disabled={disable}
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              className="mr-3 pl-2 bg-gray-200"
            />
            {todo.removed ? (
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 m-1"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#374151"
                    d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                <svg
                  className="w-6 h-6"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="transparent"
                    fill="#374151"
                    d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"
                  />
                </svg>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
