import React, {FC} from 'react';
import { IUser } from '../../../types/Types';

interface UserItemProps {
  user: IUser;
  onClick: (user: IUser) => void;
}

const UserItem: FC<UserItemProps> = ({user, onClick}) => {
  return (
    <div
      style={{padding: 15, border: '1px solid lightgray', cursor: 'pointer'}}
      onClick={() => onClick(user)}
    >
      {user.id}. {user.name} проживает в городе {user.address.city} на улице {user.address.street}
    </div>
  );
}

export default UserItem ;
