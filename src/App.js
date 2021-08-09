import { useState, useEffect } from 'react'
import shortid from 'shortid'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
import ContactForm from './components/ContactForm/ContactForm'
import './App.scss'

function App() {
  const [contacts, setContasts] = useState([])
  const [filter, setFilter] = useState('')

  const formsSubmitHandler = ({ name, number }) => {
    const isPresentName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (isPresentName) {
      alert(`${name} is already in contacts`)
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      }

      setContasts((prevContacts) => [...prevContacts, contact])
    }
  }

  const onDeleteContact = (contactId) => {
    setContasts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    )
  }

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value)
  }

  useEffect(() => {
    const contactss = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contactss)
    if (parsedContacts) {
      setContasts(parsedContacts)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const normalizedFilter = filter.toLowerCase()

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  )

  return (
    <div className="AppRoot">
      <h1 className="AppTitle">Phonebook</h1>
      <ContactForm onSubmit={formsSubmitHandler} />

      <h2 className="AppTitle">Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />

      <ContactList
        contacts={visibleContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  )
}
export default App
