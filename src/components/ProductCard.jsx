import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={product.thumbnail} 
        className="card-img-top" 
        alt={product.title}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted" style={{ fontSize: '0.9rem', minHeight: '60px' }}>
          {product.description.substring(0, 80)}...
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-success">${product.price}</span>
          <small className="text-warning">⭐ {product.rating}</small>
        </div>
      </div>
      <div className="card-footer bg-white">
        <Link 
          to={`/product/${product.id}`}
          className="btn btn-primary btn-sm w-100"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
