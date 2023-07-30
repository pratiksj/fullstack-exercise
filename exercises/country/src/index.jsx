import { createRoot } from "react-dom/client";
//import { config } from "dotenv";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
