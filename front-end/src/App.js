import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Weights from "./components/Weights";
import Foods from "./components/Foods";
import PageNotFound from "./components/PageNotFound";
import MyNavbar from "./components/MyNavbar";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <>
                <MyNavbar />
                <Dashboard />
              </>
            }
          ></Route>
          <Route
            path="/myprofile"
            element={
              <>
                <MyNavbar />
                <Profile />
              </>
            }
          ></Route>
          <Route
            path="/weights"
            element={
              <>
                <MyNavbar />
                <Weights />
              </>
            }
          ></Route>
          <Route
            path="/foods"
            element={
              <>
                <MyNavbar />
                <Foods />
              </>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
