const Part = (props) => {
  console.log(props, "from part compoent");
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

export default Part;
