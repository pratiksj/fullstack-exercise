import { useContext } from "react";
import { createContext,useReducer } from "react";

const notificationReducer =(state,action)=>{
    switch(action.type){
    case "NOTI":
        return action.payload
        default:return state
    }
}

const CounterContext = createContext()
export const useMessage =()=>{
    const messageDispatch = useContext(CounterContext)
    return messageDispatch[0]
}
export const useMessageDispatch =()=>{
    const messageDispatch = useContext(CounterContext)
    return messageDispatch[1]
}

export const CounterContextProvider=(props)=>{
 const [message,messageDispatch]=useReducer(notificationReducer,'')
 return (
    <CounterContext.Provider value ={[message,messageDispatch]}>
        {props.children}
    </CounterContext.Provider>
 )
}

export default CounterContext