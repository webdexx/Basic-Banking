import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter >
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </ BrowserRouter>  
    </>
  );
}

export default App;
