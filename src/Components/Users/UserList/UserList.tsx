import React, {FC} from 'react';
import { IUser } from '../../../types/Types';
import UserItem from '../UserItem/UserItem';

import { useNavigate } from 'react-router-dom'

interface UserListProps {
  users: IUser[];
  width?: string;
  height?: string;
}

const UserList: FC<UserListProps> = ({users, width, height}) => {

  const history = useNavigate();

  return (
    <div style={{width, height, overflow: 'scroll'}}>
      {users.map(user =>
        <UserItem
          key={user.id}
          user={user}
          onClick={(user) => history('/users/' + user.id)}
        />
      )}
    </div>
  );
}

export default UserList;