import React from 'react';

interface Todo {
  value: string;
  id: number;
}

interface ListProps {
  todos: Todo[];
}

const List = (props: ListProps) => {
  return (
    <ul>
      {props.todos.map((todo) => {
        return <li key={todo.id}>{todo.value}</li>;
      })}
    </ul>
  )
}

export default List;
