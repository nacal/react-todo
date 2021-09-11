import React, { useState } from 'react';
import Form from './Form';
import List from './List';
import Select from './Select';

interface Todo {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export type { Filter, Todo };


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <>
      <Form
        filter={filter}
        todos={todos}
        setTodos={setTodos}
        className="pt-8 mb-4"
      />
      <Select
        setFilter={setFilter}
        className="mb-8"
      />
      <List
        filter={filter}
        todos={todos}
        setTodos={setTodos}
      />
    </>
  )
}

export default App;
