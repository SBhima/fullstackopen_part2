import { useState } from 'react'

const ShowPerson = ({person}) => <li>{person.name} {person.number}</li>

const Directory = ({people}) => {
  return (
  <ul>
    {people.map(person => <ShowPerson key={people.indexOf(person)} person={person} />)}
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
const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [filteredList, setfilteredList] = useState(persons)



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
    setPersons(persons.concat(tempPerson))

    setfilteredList(filteredList.concat(tempPerson))
    setNewName('')
    setNewNumber('')

  }

  
  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={searchWord} onChange={handleSearch} />
      </div>

      <h2>Add a New Person</h2>

        <PersonForm handleSubmit = {handleSubmit} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
        <Directory people = {filteredList}/>
    </div>
  )
}

export default App

