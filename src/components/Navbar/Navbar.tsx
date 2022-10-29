import React from 'react';
import { Button } from '../common/Button';
import styles from './index.module.scss';
import { logo } from '../../assets';

interface Props {
  goToUsers: () => void;
  goToSignUp: () => void;
}

const Navbar = ({ goToUsers, goToSignUp }: Props) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.navbar_buttons}>
        <Button type="button" text="Users" onClick={goToUsers} />
        <Button type="button" text="Sign up" onClick={goToSignUp} />
      </div>
    </nav>
  );
};

export default Navbar;
