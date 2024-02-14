import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { HeaderUI } from "./components/header/Header";
import { Home } from "./pages/Home/Home";
import { Todos } from "./pages/todos/Todos";
import { Login } from "./pages/Login/Login";
import { ChangeEvent, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const navigateToUser = () => {
    if (username.trim() !== "") {
      localStorage.setItem("user", JSON.stringify(username));
      navigate("/todos", { replace: true });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const headerClick = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <HeaderUI onClick={headerClick} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              value={username}
              onClick={navigateToUser}
              onChange={onChange}
            />
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
