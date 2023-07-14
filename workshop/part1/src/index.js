import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

let myCout = 1

const refresh=()=>{
    ReactDOM.createRoot(document.getElementById('root')).render(<App counter={myCout} />)

}

refresh()
myCout =myCout+1
refresh()
