import { Component } from 'react';
import { Section } from './Section/Section';
import { Form } from './Section/Form/Form';
import { ContactsList } from './Section/ContactsList/ContactsList';
import { Filter } from './Section/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addToContactList = newContact => {
    const { name: newName } = newContact;
    const normalizedNewName = newName.toLowerCase();

    !this.state.contacts.find(
      ({ name: prevName }) => prevName.toLowerCase() === normalizedNewName
    )
      ? this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }))
      : alert(`${newName} is already in contacts`);
  };

  filterContacts = e => {
    const { value } = e.currentTarget;

    this.setState({ filter: value });
  };

  findContact = () => {
    const { contacts, filter } = this.state;
    const normilizedFilterValue = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normilizedFilterValue)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const foundContact = this.findContact();
    return (
      <>
        <Section title="Phonebook">
          <Form addToContactList={this.addToContactList} />
        </Section>
        <Section title="Contacts">
          {this.state.contacts.length > 0 && (
            <>
              <Filter
                filterContacts={this.filterContacts}
                filterValue={filter}
              />
              <ContactsList
                foundContact={foundContact}
                deleteContact={this.deleteContact}
              />
            </>
          )}
        </Section>
      </>
    );
  }
}

export default App;
