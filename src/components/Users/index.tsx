import React, { useRef } from 'react';
import { User, UserApi } from '../../store/types';
import { Button } from '../common/Button';
import UserItem from '../UserItem';
import styles from './index.module.scss';

interface Props {
  data?: UserApi;
  count: number;
  setCount: (n: number) => void;
}

const Users = ({ data, count, setCount }: Props) => {
  const divRef = useRef<any>(null);

  const getMoreUsers = () => {
    setCount(count + 6);
    divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <div className={styles.users} ref={divRef} id="users">
      <h1 className={styles.title}>Working with GET request</h1>
      <div className={styles.users_items}>
        {data?.users.map((user: User) => (
          <UserItem key={user.id} {...user} />
        ))}
      </div>
      <div className={styles.more}>
        <Button
          type="button"
          text="Show more"
          onClick={getMoreUsers}
          style={{
            width: '120px',
            display: `${count >= data?.total_users! ? 'none' : ''}`,
          }}
        />
      </div>
    </div>
  );
};

export default Users;
