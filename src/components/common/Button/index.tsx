import React from 'react';
import styles from './index.module.scss';

interface Props {
  type: 'button' | 'submit';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  style?: Partial<React.CSSProperties>;
}

export const Button = ({ type, onClick, text, style, disabled }: Props) => {
  return (
    <button type={type} onClick={onClick} 
		className={`${styles.button} ${disabled ? styles.disabled : ''}`}
		disabled={disabled}
		style={{ ...style }}>
      {text}
    </button>
  );
};
