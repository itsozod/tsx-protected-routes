import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home/Home";
import { Todos } from "./pages/todos/Todos";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { SingleTodo } from "./components/SingleTodo/SingleTodo";
import { Requests } from "./components/Requests/Requests";
import { useTypedSelector } from "./store/store";

function App() {
  const accessToken = useTypedSelector((state) => state.auth.accessToken);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<ProtectedRoute onlyFor={accessToken} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/todos" element={<ProtectedRoute onlyFor={accessToken} />}>
          <Route path="/todos" element={<Todos />} />
          {/* <Route path="/todos:todoId" element={<SingleTodo />} /> */}
        </Route>
        {/* <Route
          path="/requests"
          element={<ProtectedRoute onlyFor={accessToken} />}
        >
          <Route path="/requests" element={<Requests />} />
        </Route>
        <Route
          path="/newRequests"
          element={<ProtectedRoute onlyFor={accessToken} />}
        >
          <Route path="/newRequests" element={<Requests />} />
        </Route> */}
      </Routes>
    </>
  );
}
export default App;
