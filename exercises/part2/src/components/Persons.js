const Persons = ({ filter }) => {
  return (
    <div>
      {filter.map((person, index) => {
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

export default Persons;
