import React, {FC} from 'react';
import { ITodo } from 'Types/Types';

interface TodoItemProps {
  todo: ITodo;
  onClick: (todo: ITodo) => void;
}

const TodoItem: FC<TodoItemProps> = ({todo, onClick}) => {
  return (
    <div onClick={() => onClick(todo)}
      style={{
        cursor: 'pointer',
        textDecoration: 'underline lightgray',
        padding: 5,
      }}
    >
      <input type="checkbox" checked={todo.completed} style={{marginRight: 10, cursor: 'pointer'}} onChange={() => {}}/>
      {todo.id}. {todo.title}
    </div>
  );
}

export default TodoItem;