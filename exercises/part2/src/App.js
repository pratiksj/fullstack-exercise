import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
  const object = {
    newName,
    newNumber,
    addPerson,
    handleOnChange,
    handleOnChangeNum,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleOnFilter} />
      <h3> add a new </h3>
      <PersonForm data={object} />
      <h2>Numbers</h2>
      <Persons filter={filterPerson} />
    </div>
  );
};

export default App;
