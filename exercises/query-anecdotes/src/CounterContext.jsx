import { createContext,useReducer } from "react";

const notificationReducer =(state,action)=>{
    switch(action.type){
    case "NOTI":
        return action.payload
        default:return state
    }
}

const CounterContext = createContext()

export const CounterContextProvider=(props)=>{
 const [message,messageDispatch]=useReducer(notificationReducer,'')
 return (
    <CounterContext.Provider value ={[message,messageDispatch]}>
        {props.children}
    </CounterContext.Provider>
 )
}

export default CounterContext