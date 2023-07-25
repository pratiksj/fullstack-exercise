const Filter = ({ value, onChange }) => {
  return (
    <div>
      <div>
        filer show with
        <input value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default Filter;
