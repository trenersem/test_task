import styles from './index.module.scss';

interface Props {
  value?: string | number;
  checkbox?: any;
}

const Checkbox = ({ checkbox, value }: Props) => {
  return (
    <div className={styles.checkbox} style={{border: `${checkbox === value ? '1px solid #00bdd3': '1px solid #d0cfcf'}`}}>
      {checkbox === value ? <div className={styles.selected}></div> : null}
    </div>
  );
};
export default Checkbox;
