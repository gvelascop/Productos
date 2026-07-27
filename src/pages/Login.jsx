import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const { iniciarSesion } = useContext(AuthContext);
    const navigate = useNavigate();

    async function manejarLogin(e) {
        e.preventDefault();
        setError("");

        if (!usuario || !password) {
            setError("Por favor completa todos los campos");
            return;
        }

        try {
            setCargando(true);
            const datos = await login(usuario, password);
            iniciarSesion(datos);
            navigate("/home");
        } catch {
            setError("Usuario o contraseña incorrectos");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: '#f5f5f5' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white py-4">
                                <h3 className="mb-0 text-center fw-bold">Iniciar Sesión</h3>
                            </div>

                            <div className="card-body p-5">
                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Error:</strong> {error}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setError("")}
                                        ></button>
                                    </div>
                                )}

                                <form onSubmit={manejarLogin}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold text-secondary">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="emilys"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            disabled={cargando}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold text-secondary">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="emilyspass"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={cargando}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 fw-bold"
                                        disabled={cargando}
                                    >
                                        {cargando ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Cargando...
                                            </>
                                        ) : (
                                            "Iniciar Sesión"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;