import React from 'react'

export const Notification = ({ message }) => {
    if (!message) {
        return null
    }


    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    console.log(message, 'from notification component')
    return (
        <div style={error}>{message}</div>
    )
}
