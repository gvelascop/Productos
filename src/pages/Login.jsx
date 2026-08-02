import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!username || !password) {

            setError("Todos los campos son obligatorios");

            return;
        }

        try {

            setLoading(true);

            const user = await loginUser(username, password);

            login(user);

            navigate("/productos");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">

            <div className="row w-100 justify-content-center">

                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                        <div className="card-body p-4 p-lg-5">

                            <div className="text-center mb-4">

                                <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center p-3 mb-3">
                                    <i className="bi bi-shop fs-2 text-primary"></i>
                                </div>

                                <h2 className="fw-bold mb-1">Bienvenido a ShopPanel</h2>
                                <p className="text-muted mb-0">Ingresa tus credenciales para continuar</p>

                            </div>

                            {error && (

                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {error}
                                </div>

                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-person me-2"></i>
                                        Usuario
                                    </label>

                                    <input

                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Ej: emilys"
                                        required

                                        value={username}

                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-lock me-2"></i>
                                        Contraseña
                                    </label>

                                    <input

                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="••••••••"
                                        required

                                        value={password}

                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }

                                    />

                                </div>

                                <button
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Ingresando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Iniciar Sesión
                                        </>
                                    )}

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}