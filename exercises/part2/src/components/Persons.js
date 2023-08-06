const Persons = ({ filter, deletePerson }) => {

  if (!filter) {
    return null
  }
  return (
    <div>
      {filter.map((person) => (

        <div key={person.id}>
          {" "}
          {person.name}
          {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>

      ))}
    </div>
  );
};

export default Persons;
