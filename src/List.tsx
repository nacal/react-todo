import React from 'react';
import { Todo } from './App';

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

interface ListProps {
  filteredTodos: Todo[];
  handleOnEdit: (id: number, value: string) => void;
  handleOnCheck: (id: number, checked: boolean) => void;
  handleOnRemove: (id: number, removed: boolean) => void;
  filter: Filter;
}

const List = (props: ListProps) => {
  const disable: boolean = (props.filter === 'checked' || props.filter === 'removed');

  return (
    <ul>
      {props.filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={disable}
              checked={todo.checked}
              onChange={() => props.handleOnCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              disabled={disable}
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
