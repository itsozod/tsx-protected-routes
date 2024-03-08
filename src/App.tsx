import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home/Home";
import { Todos } from "./pages/todos/Todos";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<ProtectedRoute onlyFor={accessToken} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/todos" element={<ProtectedRoute onlyFor={accessToken} />}>
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
