import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person, index) => {
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
