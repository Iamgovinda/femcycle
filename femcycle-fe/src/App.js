import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/Routers";
// import ProductContextProvider from "./context/ProductContext";
import CartCountContextProvider from "./context/CartCountContex";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
    <UserProvider>
      <CartCountContextProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </CartCountContextProvider>
    </UserProvider>

      <ToastContainer
        position={"top-center"}
        autoClose={2000}
        theme={"colored"}
      />
    </>
  );
}

export default App;
