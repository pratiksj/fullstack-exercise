import React from 'react'

export const Notification = ({message}) => {

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
