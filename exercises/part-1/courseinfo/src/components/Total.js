const Total = ({ parts }) => {
  return (
    <h3>
      Number of exercise{" "}
      {parts.reduce(
        (accumulator, currentVal) => accumulator + currentVal.exercises,
        0
      )}
    </h3>
  );
};

export default Total;
