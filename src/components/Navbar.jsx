import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <button

                className="navbar-toggler"

                data-bs-toggle="collapse"

                data-bs-target="#menu"

            >

                <span className="navbar-toggler-icon"></span>

            </button>

            <div

                className="collapse navbar-collapse"

                id="menu"

            >

            </div>

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/productos"
                >
                    ShopPanel
                </Link>

                <div className="navbar-nav">

                    <Link
                        className="nav-link text-white"
                        to="/productos"
                    >
                        Productos
                    </Link>

                    <Link
                        className="nav-link text-white"
                        to="/pedidos"
                    >
                        Pedidos
                    </Link>

                </div>

                <div className="d-flex align-items-center">

                    <span className="text-white me-3">

                        {user?.firstName} {user?.lastName}

                    </span>

                    <button

                        className="btn btn-danger"

                        onClick={() => {

                            logout();
                            navigate("/login");
                        }}

                    >

                        Cerrar sesión

                    </button>

                </div>

            </div>

        </nav>

    );

}