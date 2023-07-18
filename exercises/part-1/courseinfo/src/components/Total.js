const Total = (props) => {
  console.log(props, "from total");
  return (
    <h3>
      Number of exercise{" "}
      {props.data.reduce(
        (accumulator, currentVal) => accumulator + currentVal,
        0
      )}
    </h3>
  );
};

export default Total;
