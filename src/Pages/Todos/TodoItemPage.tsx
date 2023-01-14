import React, {FC, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { ITodo } from 'Types/Types';
import Button from 'Components/Button/Button';

interface TodoItemPageParams {
  [id: string]: string;
}

const TodoItemPage: FC = () => {

  const [todo, setTodo] = useState<ITodo | null>(null)

  // todopage params (id)
  const params = useParams<TodoItemPageParams>()

  // navigation
  const history = useNavigate();

  useEffect( () => {
    fetchTodo()
  }, [])

  async function fetchTodo() {
    try {
      const response = await axios.get<ITodo>('https://jsonplaceholder.typicode.com/todos/' + params.id)
      setTodo(response.data)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div>
      <Button onClick={() => history('/todos')}>Назад</Button>
      
      <h1>Задача № {todo?.id}</h1>
      <div>
        {todo?.title}
      </div>
      {todo?.completed
      ? <div style={{fontStyle: 'italic'}}>Статус: Выполнена</div>
      : <div style={{fontStyle: 'italic'}}>Статус: Не выполнена</div>
      }
    </div>
  );
}

export default TodoItemPage;