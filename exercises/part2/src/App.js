import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((entry) => entry.name === newName)) {
      return alert(`${newName} is already exist`);
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, newObject]);

    setNewName("");
    setNewNumber("");
  };

  const handleOnChange = (event) => {
    //let newname = event.target.value;
    setNewName(event.target.value);
  };
  const handleOnChangeNum = (event) => {
    setNewNumber(event.target.value);
  };
  const handleOnFilter = (event) => {
    setFilter(event.target.value);
  };

  const filterPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filer show with
        <input value={filter} onChange={handleOnFilter} />
      </div>
      <h3> add a new </h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleOnChangeNum} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPerson.map((person, index) => {
        return (
          <div key={index}>
            {" "}
            {person.name}
            {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
