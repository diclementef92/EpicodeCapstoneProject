import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
