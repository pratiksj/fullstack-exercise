import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let percentage = (good / total) * 100;
  let average = (good - bad) / 3;
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <table>
          <tbody>
            <tr>
              <td>
                <p>all:{total}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>average:{average}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>positive:{percentage}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h1>No feedback given</h1>;
  }
};

export default Statistics;
