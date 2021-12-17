import PropTypes from 'prop-types';
import styles from './Section.module.css';

const Section = ({ children }) => {
  return <section className={styles.Section}>{children}</section>;
};

Section.propTypes = { children: PropTypes.array.isRequired };

export default Section;
