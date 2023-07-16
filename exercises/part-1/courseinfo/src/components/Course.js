import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => {
        return <Content data={part} key={part.id} />;
      })}
    </div>
  );
};

export default Course;
