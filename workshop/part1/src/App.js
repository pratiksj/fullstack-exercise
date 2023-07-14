import { useState } from "react"
import Mytag from "./compoenents/Mytag"
import MyButton from "./compoenents/MyButton"
import Display from "./compoenents/Display"
import HistoryDisplay from "./compoenents/HistoryDisplay"


const App = () => {
const myState = useState(1)
const myCount =myState[0]
const setMycount = myState[1]
const[clickButtonHistory,setClickButtonHistory] = useState([])

const increaseCountFromButton=()=>{
  setMycount(myCount+1)
  setClickButtonHistory([...clickButtonHistory,'Button'])
}
const increaseCountFromApp=()=>{
  setMycount(myCount+1)
  setClickButtonHistory([...clickButtonHistory,'App'])
}

  let name1 = 'Amir'
  return ( <div>
    <h3>{myCount}</h3>
    <Display showValue={myCount}/>
    <HistoryDisplay history={clickButtonHistory}/>
    <button onClick={increaseCountFromApp}>Click me in same compoenents</button>
    <MyButton buttonHandler={increaseCountFromButton}/>
    <Mytag name ={name1} lastName= "someLast Name1"/>
    <Mytag name ="Niru" lastName= "someLast Name2"/>
    <Mytag name ="Ashim" lastName= "someLast Name3"/>
  </div>
)
  }

export default App