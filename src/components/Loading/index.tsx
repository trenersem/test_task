import React from 'react';
import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default Loading;
