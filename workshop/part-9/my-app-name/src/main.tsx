import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
interface WelcomeProps {
  name: string;
}

const Welcome = (props:WelcomeProps):JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
};

// Welcome.propTypes = {
//   name: PropTypes.string
// };


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Welcome name='sarah'/>
  </React.StrictMode>,
)
