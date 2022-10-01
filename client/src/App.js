import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Page/Home";
import Task from "./Page/Task";
import UserAuthContextProvider from "./Context/UserAuthContext";
import AddTask from "./Page/AddTask";
import Admin from "./Page/Admin";
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/addtask/:id" element={<Task />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
