

const HistoryDisplay = ({history}) => {
    if(history.length>0){

        return  <h3>The history of click is{history}</h3>
    } else{
        return <h3>There is no history yet</h3>
    }
  
}

export default HistoryDisplay
