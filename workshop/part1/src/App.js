import { useState } from "react"
import Mytag from "./compoenents/Mytag"


const App = () => {
const myState = useState(1)
const myCount =myState[0]
const setMycount = myState[1]
setTimeout(()=>{
  setMycount(myCount+1)
},1000)

  let name1 = 'Amir'
  return ( <div>
    <h3>{myCount}</h3>
    <Mytag name ={name1} lastName= "someLast Name1"/>
    <Mytag name ="Niru" lastName= "someLast Name2"/>
    <Mytag name ="Ashim" lastName= "someLast Name3"/>
  </div>
)
  }

export default App