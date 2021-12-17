import { Component } from 'react';
import PropTypes from 'prop-types';
import FORM_CONFIG from 'formConfig';
import styles from './ContactForm.module.css';

export default class Phonebook extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
  };

  state = { name: '', number: '' };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddContact(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.Form}>
        <ul className={styles.List}>
          {FORM_CONFIG.map(({ type, name, pattern, title, required }) => (
            <li key={name} className={styles.Item}>
              <label className={styles.Label}>
                {name}
                <input
                  className={styles.Input}
                  type={type}
                  name={name}
                  pattern={pattern}
                  title={title}
                  value={this.state[name]}
                  onChange={this.handleChange}
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
}

FORM_CONFIG.PropTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
