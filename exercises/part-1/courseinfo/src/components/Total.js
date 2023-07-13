const Total = ({ parts }) => {
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <p>Number of exercises</p>
      </div>
      <div style={{ display: "inline-block" }}>
        <span>
          {parts.reduce(
            (accumulator, currentVal) => accumulator + currentVal.exercises,
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default Total;
