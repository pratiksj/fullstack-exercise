const PersonForm = ({ data }) => {
  console.log(data, "form");
  return (
    <div>
      <form onSubmit={data.addPerson}>
        <div>
          name: <input value={data.newName} onChange={data.handleOnChange} />
        </div>
        <div>
          number:{" "}
          <input value={data.newNumber} onChange={data.handleOnChangeNum} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
