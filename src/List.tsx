import React from 'react';
import { Todo, Filter } from './App';

interface ListProps {
  filter: Filter;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const List = (props: ListProps) => {
  const disable: boolean = (props.filter === 'checked' || props.filter === 'removed');

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
    <ul>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={disable}
              checked={todo.checked}
              onChange={() => handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              disabled={disable}
              value={todo.value}
              onChange={(e) => handleOnEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        );
      })}
    </ul>
  )
}

export default List;
