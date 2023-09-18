import { useState } from "react";
import useField from "./Hooks/useField";

const FormHook = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");
  //   const [name, setName] = useState("");
  //   const [born, setBorn] = useState("");
  //   const [height, setHeight] = useState("");

  return (
    <div>
      <form>
        name:
        <input type={name.type} value={name.value} onChange={name.onChange} />
        <br />
        birthdate:
        <input type={born.type} value={born.value} onChange={born.onChange} />
        <br />
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default FormHook;
