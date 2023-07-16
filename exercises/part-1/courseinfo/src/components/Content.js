import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Content = ({ data }) => {
  console.log(data, "from Content ");
  return (
    <div>
      <Header course={data.name} />

      {data.parts.map((data) => {
        return (
          <Part part={data.name} exercise={data.exercises} key={data.id} />
        );
      })}
      <Total data={data} />
    </div>
  );
};

export default Content;
