import Part from "./Part";

const Content = ({ data }) => {
  return (
    <div>
      <Part part={data.name} exercise={data.exercises} />
    </div>
  );
};

export default Content;
