import React, {FC, useEffect, useState} from 'react';
import { IUser } from '../../Types/Types';
import List from '../../Components/List/List';
import UserItem from '../../Components/Users/UserItem/UserItem';
import UserList from '../../Components/Users/UserList/UserList';

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UsersPage: FC = () => {

  const [users, setUsers] = useState<IUser[]>([])
  
  // navigation
  const history = useNavigate();

  useEffect( () => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <div style={{display: 'inline-flex'}}>
      <div>
        <h2>Clickable Users List</h2>
        <UserList users={users} width='100%' height='100%'/>
      </div>

      <div style={{marginLeft: 30}}>
        <h2>Clickable Template List</h2>
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
          <List
            items={users}
            renderItem={(user: IUser) =>
              <UserItem
                user={user}
                onClick={(user) => history('/users/' + user.id)}
                key={user.id}
              />}
          />
        </div>
      </div>
    </div>
  );
}

export default UsersPage;