const Statistics = ({ good, neutral, bad }) => {
  const percentage = () => {
    let total = good + neutral + bad;
    return (good / total) * 100;
  };
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>good:{good}</p>
        <p>neutral:{neutral}</p>
        <p>bad:{bad}</p>
        <p>all:{good + neutral + bad}</p>
        <p>average:{(good - bad) / 3}</p>
        <p>positive:{percentage()}%</p>
      </div>
    );
  } else {
    return <h1>No feedback given</h1>;
  }
};

export default Statistics;
