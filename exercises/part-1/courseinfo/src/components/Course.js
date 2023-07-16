import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => {
        return <Content data={part} key={part.id} />;
      })}
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
