import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Bienvenido, {user?.username}</span>
          <button 
            className="btn btn-outline-light" 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h2>Home</h2>
      </div>
    </div>
  );
}