import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
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

    if (!newName || !newNumber) {
      return alert("please fill both the name and the number field ");
    }
    let findNumber = persons.find((person) => person.name === newName);
    let updatedNumber = { ...findNumber, number: newNumber };

    if (findNumber) {
      let confirmNum = window.confirm(
        `${findNumber.name} is already added to phonebook,replace the old with new one`
      );
      if (confirmNum) {
        personServices.update(findNumber.id, updatedNumber).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === findNumber.id ? response.data : person
            )
          );
        });
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };

      personServices.create(newObject).then((response) => {
        setPersons([...persons, response]);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleOnChange = (event) => {

    setNewName(event.target.value);
  };


  const handleOnChangeNum = (event) => {
    setNewNumber(event.target.value);
  };
  const handleOnFilter = (e) => {
    setFilter(e.target.value);
  };

  const filterPerson = !persons ? null : persons.filter((person) => {

    return person.name.toLowerCase().includes(filter.toLowerCase())
  });

  const deletePerson = (id) => {
    let findPersonWithId = persons.find((person) => person.id === id);

    let confirmResult = window.confirm(`${findPersonWithId.name} delete`);
    if (confirmResult) {
      personServices
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(
            `the note '${findPersonWithId.content}' was already deleted from server`
          );
          setPersons(persons.filter((n) => n.id !== id));
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
      {/* <Filter handleOnFilter={handleOnFilter} /> */}
      <h3> add a new </h3>
      <PersonForm data={object} />
      <h2>Numbers</h2>
      <Persons filter={filterPerson} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
