import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload

        }
    }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(showNotification(text))
        setTimeout(() => {
            dispatch(showNotification(null))
        }, time * 1000)
    }
}