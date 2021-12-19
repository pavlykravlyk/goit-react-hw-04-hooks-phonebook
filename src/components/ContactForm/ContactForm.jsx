import { useState } from 'react';
import PropTypes from 'prop-types';
import FORM_CONFIG from 'formConfig';
import styles from './ContactForm.module.css';

export default function Phonebook({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    name === 'name' && setName(value);
    name === 'number' && setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <ul className={styles.List}>
        {FORM_CONFIG.map(({ type, name, pattern, title }) => (
          <li key={name} className={styles.Item}>
            <label className={styles.Label}>
              {name}
              <input
                className={styles.Input}
                type={type}
                name={name}
                pattern={pattern}
                title={title}
                value={name[name]}
                onChange={handleChange}
                required
              />
            </label>
          </li>
        ))}
      </ul>

      <button type="submit" className={styles.Btn}>
        add contact
      </button>
    </form>
  );
}

FORM_CONFIG.PropTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Phonebook.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
