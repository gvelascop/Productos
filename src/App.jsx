import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/home"
        element={
          <RutaProtegida>
            <Home />
          </RutaProtegida>
        }
      />

      <Route
        path="*"
        element={<div className="container mt-5 text-center"><h1>Página no encontrada</h1></div>}
      />
    </Routes>
  );
}

export default App;