import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Home/LadingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound";
import AddTask from "./components/pages/AddTask";
import UpdateTask from "./components/pages/UpdateTask";
import Edit from "./components/pages/Edit";
import DeleteTask from "./components/pages/DeleteTask";
import AllTask from "./components/pages/AllTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/addtask" element={<AddTask />}></Route>
          <Route path="/updatetask" element={<UpdateTask />}></Route>
          <Route path="/updatetask/:id" element={<Edit />}></Route>
          <Route path="/deleteTask" element={<DeleteTask />}></Route>
          <Route path="/alltask" element={<AllTask />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
