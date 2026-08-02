import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    return (

        <div className="col-12 col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                        height: "220px",
                        objectFit: "cover"
                    }}
                />

                <div className="card-body d-flex flex-column">

                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold mb-0">{product.title}</h5>
                        <span className="badge bg-success rounded-pill">
                            <i className="bi bi-tags me-1"></i>
                            {product.category}
                        </span>
                    </div>

                    <p className="text-muted flex-grow-1">
                        {product.description.substring(0, 90)}...
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h4 className="text-success mb-0">${product.price}</h4>
                        <span className="text-muted small">
                            <i className="bi bi-box-seam me-1"></i>
                            {product.stock} stock
                        </span>
                    </div>

                </div>

                <div className="card-footer bg-white border-0 pt-0 pb-3">

                    <Link

                        className="btn btn-outline-primary w-100"

                        to={`/productos/${product.id}`}

                    >
                        <i className="bi bi-eye me-2"></i>
                        Ver detalle

                    </Link>

                </div>

            </div>

        </div>

    );

}