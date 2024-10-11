import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="app">
      <HomePage />
      {/*Set ToastContainer to bottom right of page and have it close after 2 seconds*/}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
