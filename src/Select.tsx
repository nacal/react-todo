import { Dispatch, SetStateAction } from 'react';
import { Filter } from './App';

interface SelectProps {
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const Select = (props: SelectProps) => {
  return (
    <select
      defaultValue="all"
      onChange={(e) => props.setFilter(e.target.value as Filter)}>
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">未完了のタスク</option>
      <option value="removed">削除済みのタスク</option>
    </select>
  )
}

export default Select;
