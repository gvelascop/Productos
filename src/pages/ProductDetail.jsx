import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || 'Producto no encontrado'}</div>
        <button className="btn btn-primary" onClick={() => navigate('/home')}>
          Volver al Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Detalle del Producto</span>
          <button 
            className="btn btn-outline-light" 
            onClick={() => navigate('/home')}
          >
            ← Volver
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={product.images?.[0] || product.thumbnail} 
              className="img-fluid rounded"
              alt={product.title}
            />
            <div className="row mt-3 g-2">
              {product.images?.slice(1, 4).map((img, idx) => (
                <div key={idx} className="col-4">
                  <img src={img} className="img-fluid rounded" alt={`${product.title} ${idx + 2}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h2>{product.title}</h2>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
              <span className="text-muted">({product.reviews?.length || 0} reseñas)</span>
            </div>

            <h3 className="text-success mb-3">${product.price}</h3>

            <p className="text-muted mb-3">{product.description}</p>

            <dl className="row mb-4">
              <dt className="col-sm-3">Categoría:</dt>
              <dd className="col-sm-9">{product.category}</dd>

              <dt className="col-sm-3">Stock:</dt>
              <dd className="col-sm-9">
                {product.stock > 0 ? (
                  <span className="badge bg-success">En stock ({product.stock})</span>
                ) : (
                  <span className="badge bg-danger">Sin stock</span>
                )}
              </dd>

              <dt className="col-sm-3">Descuento:</dt>
              <dd className="col-sm-9">{product.discountPercentage}%</dd>

              <dt className="col-sm-3">Marca:</dt>
              <dd className="col-sm-9">{product.brand}</dd>
            </dl>

            <button className="btn btn-success btn-lg w-100">
              Agregar al Carrito
            </button>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <h4>Reseñas</h4>
              <div className="list-group">
                {product.reviews.slice(0, 5).map((review, idx) => (
                  <div key={idx} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mb-1">{review.reviewerName}</h6>
                      <span className="badge bg-primary">⭐ {review.rating}</span>
                    </div>
                    <p className="mb-1">{review.comment}</p>
                    <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
