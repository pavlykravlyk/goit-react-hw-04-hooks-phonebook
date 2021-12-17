import { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactList from './components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import initialContacts from '../src/contacts.json';

class App extends Component {
  static defaultProps = {
    contacts: initialContacts,
    filter: '',
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts && this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    this.state.contacts.some(contact => name === contact.name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, { name, number, id: nanoid() }],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContactsByName = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContactList = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filteredContacts),
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, findContactsByName, filterContactList, deleteContact } =
      this;

    return (
      <main className="App">
        <Container>
          <Section>
            <h1 className="Title">Phonebook</h1>
            <ContactForm onAddContact={addContact} />
          </Section>
          <Section>
            <h2 className="Title">Contacts</h2>
            <Filter contactName={filter} onFindContact={findContactsByName} />
            <ContactList
              contacts={filterContactList()}
              onDeleteContact={deleteContact}
            />
          </Section>
        </Container>
      </main>
    );
  }
}

export default App;
