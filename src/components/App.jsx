import { useEffect } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './Section/Form/Form';
import { ContactsList } from './Section/ContactsList/ContactsList';
import { Filter } from './Section/Filter/Filter';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';

const LS_CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_CONTACTS_KEY))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.getItem(LS_CONTACTS_KEY);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactItem = ({ id, name, number }) => {
    name = name.trim();
    const normalizedName = name.toLocaleLowerCase();

    if (id !== '' && id !== null) {
      onDeleteContact(id);
    } else {
      if (
        contacts.some(({ name }) => name.toLocaleLowerCase() === normalizedName)
      ) {
        toast.warn('This name is already exsist in your list🐷', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        return;
      }

      id ||= nanoid();
      onContactSvae({ id, name, number });
      return id;
    }
  };

  const onContactSvae = ({ id, name, number }) => {
    setContacts(pC => [...pC, { id, name, number }]);
  };

  const onDeleteContact = id => {
    if (contacts.length === 1) clearFilterField();
    setContacts(pC => pC.filter(contact => contact.id !== id));
  };

  const onFilterContacts = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const clearFilterField = () => {
    setFilter('');
  };

  const normalizedFilter = filter.toLocaleLowerCase();
  const filteredContacts = contacts
    .filter(contact =>
      contact?.name?.toLocaleLowerCase().includes(normalizedFilter)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <ToastContainer />
      <Section title="Phonebook">
        <ContactForm onSubmit={addContactItem} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && (
          <>
            <Filter filterContacts={onFilterContacts} filterValue={filter} />
            <ContactsList
              foundContact={filteredContacts}
              deleteContact={onDeleteContact}
            />
          </>
        )}
      </Section>
    </>
  );
};
