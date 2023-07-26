const Persons = ({ filter, deletePerson }) => {
  return (
    <div>
      {filter.map((person, index) => {
        return (
          <div key={index}>
            {" "}
            {person.name}
            {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
