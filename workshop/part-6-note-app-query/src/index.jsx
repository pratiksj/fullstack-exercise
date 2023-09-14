import React from "react";
import ReactDOM from "react-dom/client";

//import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

//import App from "./App";
import Counter from "./Counter";
import { CounterContextProvider } from "./CounterContext";
//import store from "./store";
//const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <App />
  // </Provider>
  <CounterContextProvider>
    <Counter />
  </CounterContextProvider>
);
