import React, { useState } from 'react';

const initialValues = { id: '', name: '', number: '' };
const submitButtonText = 'Add user';

export const ContactForm = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const setInitialValues = () => {
    setId(initialValues.id);
    setName(initialValues.name);
    setNumber(initialValues.number);
  };

  const contactSubmitHandler = e => {
    e.preventDefault();
    const { id, name, number } = e.target.elements;
    const userAddedSuccessfully = onSubmit({
      id: id.value,
      name: name.value,
      number: number.value,
    });

    if (userAddedSuccessfully) setInitialValues();
  };

  const handleChange = e => {
    const value = e?.currentTarget?.value;
    switch (e?.currentTarget?.name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form action="#" onSubmit={contactSubmitHandler}>
      <input name="id" defaultValue={id} hidden />
      <div>
        <label htmlFor="contactName">Name</label>
        <input
          id="contactName"
          type="text"
          name="name"
          value={name}
          title="Enter your name"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Phone number</label>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,15}"
          title="Phone number must be up to 15 digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">{submitButtonText}</button>
      </div>
    </form>
  );
};
