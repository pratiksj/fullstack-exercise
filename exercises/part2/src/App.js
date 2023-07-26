import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response);
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

    personServices.create(newObject).then((response) => {
      setPersons([...persons, response]);
      console.log(response, "hellow");
    });

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
  const deletePerson = (id) => {
    console.log(id, "hello");
    let findPersonWithId = persons.find((person) => person.id === id);

    let confirmResult = window.confirm(`${findPersonWithId.name} delete`);
    if (confirmResult) {
      personServices.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

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
      <Persons filter={filterPerson} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
