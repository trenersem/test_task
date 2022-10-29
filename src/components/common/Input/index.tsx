import React from 'react';
import styles from './index.module.scss';

interface Props {
  id?: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value: string;
  onChange?: (e: string | any) => void;
  style?: Partial<React.CSSProperties>;
	err?: string,
}
const Input = ({
  id,
  placeholder,
  name,
  type,
  value,
  onChange,
  style,
	err,
}: Props) => {
  return (
    <div className={styles.container}>
      <input
        id={id}
        className={`${styles.input} ${err ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          !!onChange && onChange(e.target.value);
        }}
        type={type}
        name={name}
        style={{ ...style }}
      />
      <span
        className={`
          ${styles.error_label}
        `}
        style={{ opacity: `${err ? '1' : '0'}` }}
      >
        {placeholder}
      </span>
			<span
        className={`
          ${styles.error_text}
        `}
        style={{ opacity: `${err ? '1' : '0'}` }}
      >
        {err}
      </span>
    </div>
  );
};

export default Input;
