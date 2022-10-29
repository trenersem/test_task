import React from 'react';
import Tooltip from '../common/Tooltip';
import styles from './index.module.scss';
import { basicPhoto } from '../../assets';

interface Props {
  id?: number;
  name: string;
  phone: string;
  email: string;
  photo?: string;
  position?: string;
}
const UserItem = ({ name, phone, email, photo, position }: Props) => {
  return (
    <div className={styles.item}>
      <img src={photo ? photo : basicPhoto} alt="user avatar" className={styles.item_img} />
      <Tooltip text={name}>
        <p>{name}</p>
      </Tooltip>

      <div className={styles.item_info}>
        <p>{position}</p>
        <Tooltip text={email}>
          <p>{email}</p>
        </Tooltip>
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default UserItem;
