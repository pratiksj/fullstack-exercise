import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((entry) => entry.name === newName)) {
      alert(`${newName} is already exist`);
    } else {
      const newObject = {
        name: newName,
      };
      setPersons([...persons, newObject]);
      console.log(persons, "state");

      setNewName("");
    }
  };

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => {
        return <div key={index}> {person.name}</div>;
      })}
    </div>
  );
};

export default App;
