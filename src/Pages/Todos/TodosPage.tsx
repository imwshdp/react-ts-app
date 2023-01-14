import React, {FC, useEffect, useState} from 'react';
import { ITodo } from '../../types/Types';
import List from '../../Components/List/List';
import TodoItem from '../../Components/Todos/TodoItem/TodoItem';

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TodosPage: FC = () => {

  const [todos, setTodos] = useState<ITodo[]>([])

  // navigation
  const history = useNavigate();

  useEffect( () => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=100')
      setTodos(response.data)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Clickable Template Todos List</h2>
      <div style={{display: 'flex', height: '600px', overflow: 'scroll'}}>
        <List
          items={todos}
          renderItem={(todo: ITodo) =>
            <TodoItem
              todo={todo}
              key={todo.id}
              onClick={(todo) => history('/todos/' + todo.id)}
            />
          }
        />
      </div>
    </div>
  );
}

export default TodosPage;