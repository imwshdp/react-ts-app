import React, {FC, useEffect, useState} from 'react';
import { IUser } from '../../types/Types';
import { useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'
import Button from '../../Components/Button/Button';

interface UserItemPageParams {
  [id: string]: string;
}

const UserItemPage: FC = () => {

  // user data state
  const [user, setUser] = useState<IUser | null>(null)

  // userpage params (id)
  const params = useParams<UserItemPageParams>()

  // navigation hook
  const history = useNavigate()

  useEffect( () => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/users/' + params.id)
      setUser(response.data)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div>
      <Button onClick={() => history('/users')}>Назад</Button>
      <h1>Страница Пользователя {user?.name}</h1>
      <div>
        Почта: {user?.email}
      </div>
      <div>
        Адрес: Город {user?.address.city}, Улица {user?.address.street}, {user?.address.zipcode}
      </div>
    </div>
  );
}

export default UserItemPage;