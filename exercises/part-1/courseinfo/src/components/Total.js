const Total = ({ parts }) => {
  return (
    <div>
      Number of exercise{" "}
      {parts.reduce(
        (accumulator, currentVal) => accumulator + currentVal.exercises,
        0
      )}
    </div>
  );
};

export default Total;
