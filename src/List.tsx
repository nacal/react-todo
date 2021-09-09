import React from 'react';

interface Todo {
  value: string;
  id: number;
}

interface ListProps {
  todos: Todo[];
  handleOnEdit: (id: number, value: string) => void;
}

const List = (props: ListProps) => {
  return (
    <ul>
      {props.todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.value}
              onChange={(e) => props.handleOnEdit(todo.id, e.target.value)}
            />
          </li>);
      })}
    </ul>
  )
}

export default List;
