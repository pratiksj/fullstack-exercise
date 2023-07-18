import React from "react";

const Content = ({ content }) => {
  console.log(content, "from the content");
  return (
    <div>
      {content.map((data, index) => (
        <p key={index}>
          {data.part}
          {data.exercise}
        </p>
      ))}
    </div>
  );
};

export default Content;
