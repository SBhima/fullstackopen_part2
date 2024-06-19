import { useState, useEffect } from 'react'

import phoneService from './services/ppl'

const ShowPerson = ({person, updater}) => {
  
  const delHandler = (event) => {
    event.preventDefault()

    if (confirm(`Delete ${person.name}?`)){
      phoneService
      .del(person.id)
      .then(newPeople => {
        updater()
      })
    }

    
  }
  
  return (
  <li>{person.name} {person.number}  <button onClick={delHandler}>delete</button></li>
  )
}

const Directory = ({people, updater}) => {
  return (
  <ul>
    {people.map(person => <ShowPerson key={people.indexOf(person)} person={person} updater = {updater}/>)}
  </ul>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.handleSubmit}>

  <div>
    name: <input value={props.newName} onChange={props.handleNameChange}/>
    <br></br>
    number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
  </div>

  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='error' style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [filteredList, setfilteredList] = useState(persons)
  const [addMessage, setAddMessage] = useState(null)

  useEffect(() => {
    phoneService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
      setfilteredList(initialPeople)
    })
  }, [])



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase()
    const tempArr = search ? persons.filter((person) => person.name.toLowerCase().includes(search))  : persons
    
    console.log(search)
    console.log(tempArr)

    setfilteredList(tempArr)
    setSearchWord(search)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const tempPerson = {
      name : newName,
      number : newNumber
    }

    const checkArr = persons.filter((person) => person.name === tempPerson.name)
    checkArr.length === 1 ? 
    alert(`${newName} is already added to phonebook`) : 
    
    phoneService
      .create(tempPerson)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setfilteredList(filteredList.concat(returnPerson))
        setNewName('')
        setNewNumber('')
        setAddMessage(`Added ${tempPerson.name}`)
        setTimeout(() => {
          setAddMessage(null)
        },5000)
      })
    


  }

  const updateAfterDeletion = () => {
    phoneService
    .getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
      setfilteredList(initialPeople)
    })
  }



  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={addMessage}/>

      <div>
        filter shown with <input value={searchWord} onChange={handleSearch} />
      </div>

      <h2>Add a New Person</h2>

        <PersonForm handleSubmit = {handleSubmit} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
        <Directory people = {filteredList} updater = {updateAfterDeletion}/>
    </div>
  )
}

export default App

