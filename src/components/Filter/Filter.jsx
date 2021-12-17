import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ contactName, onFindContact }) => {
  return (
    <label className={styles.Label} htmlFor="">
      Find contacts by name
      <input
        className={styles.Input}
        type="text"
        value={contactName}
        onChange={onFindContact}
      />
    </label>
  );
};

Filter.propTypes = {
  contactName: PropTypes.string.isRequired,
  onFindContact: PropTypes.func.isRequired,
};

export default Filter;
