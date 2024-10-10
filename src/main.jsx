import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchProvider } from "./Components/SearchContext"; // Import SearchProvider component to manage global search state

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      {" "}
      {/* Wrap the application in SearchProvider to make search, searchType and artWorks states available in entire app */}
      <App />
    </SearchProvider>
  </StrictMode>
);
