import Content from "./Content";

const Course = ({ course }) => {
  console.log(course, "hey");
  return (
    <div>
      {course.map((part) => {
        return <Content data={part} key={part.id} />;
      })}
    </div>
  );
};

export default Course;
