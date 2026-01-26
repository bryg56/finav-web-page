import "./App.css";
import { RouterProvider } from "react-router";
import { finavRouter } from "./router/app,router";
import { UserContextProvider } from "./context/userContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={finavRouter}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;
