import React from "react";
import ReactDOM from "react-dom/client";
import { useReducer } from "react";

//import { createStore } from "redux";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

//const store = createStore(counterReducer);
// store.subscribe(() => {
//   const storeNow = store.getState();
//   console.log(storeNow);
// });

// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "ZERO" });
// store.dispatch({ type: "DECREMENT" });

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      <div>{counter}</div>
      <div>
        <button onClick={() => counterDispatch({ type: "INC" })}>+</button>
        <button onClick={() => counterDispatch({ type: "DEC" })}>-</button>
        <button onClick={() => counterDispatch({ type: "ZERO" })}>0</button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const renderApp = () => {
//   root.render(<App />);
// };

//renderApp();
//store.subscribe(renderApp);
