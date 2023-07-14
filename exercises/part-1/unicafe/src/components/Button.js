const Button = ({ goodClick, neutralClick, badClick }) => {
  return (
    <div>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
    </div>
  );
};

export default Button;
