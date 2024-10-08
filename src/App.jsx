import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <div className="app">
      <HomePage />
      {/*Set ToastContainer to bottom right of page and have it close after 3 seconds*/}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
