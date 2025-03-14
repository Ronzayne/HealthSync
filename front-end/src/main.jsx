import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppCountextProvider from "./Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppCountextProvider>
      <App />
    </AppCountextProvider>
  </BrowserRouter>
);
