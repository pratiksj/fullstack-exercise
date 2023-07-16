const Total = ({ data }) => {
  return (
    <h3>
      Number of exercise{" "}
      {data.parts.reduce(
        (accumulator, currentVal) => accumulator + currentVal.exercises,
        0
      )}
    </h3>
  );
};

export default Total;
