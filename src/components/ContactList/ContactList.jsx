import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.List}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.Item}>
          <p className={styles.Name}>{name}:</p>
          <p className={styles.Number}>{number}</p>
          <button className={styles.Btn} onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
