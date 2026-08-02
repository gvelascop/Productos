import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (err) {
        setError("Error al cargar los productos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Bienvenido, {usuario?.username}</span>
          <button 
            className="btn btn-outline-light" 
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="mb-4">Nuestros Productos</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}