import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="app">
      <HomePage />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
