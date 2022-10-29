import React from 'react';
import { Button } from '../common/Button';
import Navbar from '../Navbar/Navbar';
import styles from './index.module.scss';

interface Props {
  goToUsers: () => void;
  goToSignUp: () => void;
}

const Home = ({ goToUsers, goToSignUp }: Props) => {
  return (
    <div className={styles.home}>
      <div className={styles.navbar}>
        <Navbar goToUsers={goToUsers} goToSignUp={goToSignUp} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Test assignment for front-end developer</h1>
        <p className={styles.description}>
          What defines a good front-end developer is one that has skilled knowledge of
          HTML, CSS, JS with a vast understanding of User design thinking as they'll be
          building web interfaces with accessibility in mind. They should also be excited
          to learn, as the world of Front-End Development keeps evolving.
        </p>
        <Button type="button" text="Sign up" onClick={goToSignUp} />
      </div>
    </div>
  );
};

export default Home;
