import React from 'react';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
}

interface ListProps {
  todos: Todo[];
  handleOnEdit: (id: number, value: string) => void;
  handleOnCheck: (id: number, checked: boolean) => void;
  handleOnRemove: (id: number, removed: boolean) => void;
}

const List = (props: ListProps) => {
  return (
    <ul>
      {props.todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => props.handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
            />
            <button onClick={() => props.handleOnRemove(todo.id, todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        );
      })}
    </ul>
  )
}

export default List;
