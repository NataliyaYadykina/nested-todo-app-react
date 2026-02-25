import { useState } from 'react';
import styles from './TodoInput.module.css';

export const TodoInput = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) return;

    onAdd(trimmed);
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        className={styles.input}
        type="text"
        placeholder="Добавить задачу..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Добавить
      </button>
    </form>
  );
};