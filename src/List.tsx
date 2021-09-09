import React from 'react';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
}

interface ListProps {
  todos: Todo[];
  handleOnEdit: (id: number, value: string) => void;
  handleOnCheck: (id: number, checked: boolean) => void;
}

const List = (props: ListProps) => {
  return (
    <ul>
      {props.todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => props.handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked}
              value={todo.value}
              onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
            />
          </li>);
      })}
    </ul>
  )
}

export default List;
