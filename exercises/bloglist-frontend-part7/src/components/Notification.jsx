import React from 'react'
import { useContext } from 'react'
import NotificationContext from '../useReducers/notificationReducer'

const Notification = () => {
  const [message,dispatchMessage] = useContext(NotificationContext)

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontStyle: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }


  if(!message){
    return null
  }
  return (
    <div style={messageStyle}>{message}</div>
  )
}

export default Notification
