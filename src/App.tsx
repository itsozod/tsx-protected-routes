import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home/Home";
import { Todos } from "./pages/todos/Todos";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice/userSlice";
import { ProtectedLogin } from "./components/protectedLogin/ProtectedLogin";
import { UserSlice } from "./types/Types";

function App() {
  const isAuth = useSelector((state: UserSlice) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToUser = () => {
    navigate("/", { replace: true });
    dispatch(setUser(true));
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedLogin onlyFor={isAuth}>
              <Login onClick={navigateToUser} />
            </ProtectedLogin>
          }
        ></Route>

        <Route path="/" element={<ProtectedRoute onlyFor={isAuth} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/todos" element={<ProtectedRoute onlyFor={isAuth} />}>
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
