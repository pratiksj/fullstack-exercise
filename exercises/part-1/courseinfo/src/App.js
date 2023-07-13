import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />

      {course.parts.map((data, index) => (
        <Content data={data} key={index} />
      ))}

      {/* {course.parts.map((data, index) => (
        <Total data={data} key={index} />
      ))} */}

      <Total parts={course.parts} />
    </div>
  );
};

export default App;
