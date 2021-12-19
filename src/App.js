import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Container from './components/Container/Container';
import Section from './components/Section/Section';
import ContactList from './components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import initialContacts from '../src/contacts.json';

export default function App(props) {
  const [contacts, setContacts] = useState(props.contacts);
  const [filter, setFilter] = useState(props.filter);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    parsedContacts && setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) =>
    contacts.some(contact => name === contact.name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [
          ...prevState,
          { id: nanoid(5), name, number },
        ]);

  const deleteContact = contactId =>
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );

  const findContactsByName = event => setFilter(event.currentTarget.value);

  const filterContactList = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

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

App.defaultProps = {
  contacts: initialContacts,
  filter: '',
};
