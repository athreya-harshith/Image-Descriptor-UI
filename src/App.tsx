import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import Description from "./pages/Description";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/descriptions" element={<Description />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
