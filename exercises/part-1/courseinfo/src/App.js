//import Total from "./components/Total";

import Content from "./components/Content";
import Total from "./components/Total";

//import Course from "./components/Course";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <h1>{course}</h1>
      <Content
        content={[
          { part: part1, exercise: exercises1 },
          { part: part2, exercise: exercises2 },
          { part: part3, exercise: exercises3 },
        ]}
      />
      <Total data={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
