import Mytag from "./compoenents/Mytag"


const App = (props) => {
  let name1 = 'Amir'
  return ( <div>
    <h3>{props.counter}</h3>
    <Mytag name ={name1} lastName= "someLast Name1"/>
    <Mytag name ="Niru" lastName= "someLast Name2"/>
    <Mytag name ="Ashim" lastName= "someLast Name3"/>
  </div>
)
  }

export default App