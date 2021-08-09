import React, { useState } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'

import './ContactForm.scss'

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const nameInputId = shortid.generate()
  const numberInputId = shortid.generate()

  const handleInputChangeName = (event) => {
    setName(event.currentTarget.value)
  }

  const handleInputChangeNumber = (event) => {
    setNumber(event.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, number })
    setName('')
    setNumber('')
  }

  return (
    <form className="ContactForm" onSubmit={handleSubmit}>
      <label className="ContactForm_Input" htmlFor={nameInputId}>
        Имя
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleInputChangeName}
          id={nameInputId}
        />
      </label>
      <label className="ContactForm_Input" htmlFor={numberInputId}>
        Телефон
        <input
          type="text"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleInputChangeNumber}
          id={numberInputId}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default ContactForm
