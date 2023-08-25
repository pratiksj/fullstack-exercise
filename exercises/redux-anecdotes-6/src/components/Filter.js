import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const onClick = (e) => dispatch(filterChange(e.target.value))
    const dispatch = useDispatch()
    return (
        <div>Filter:<input name='fiter' onChange={onClick} /></div>
    )
}


export default Filter
