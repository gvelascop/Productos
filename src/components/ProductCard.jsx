import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    return (

        <div className="col-md-4 mb-4">

            <div className="card h-100 shadow"
                style={{
                    transition: "0.3s"
                }}
            >
                <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                        height: "220px",
                        objectFit: "cover"
                    }}
                />

                <div className="card-body">

                    <h5>{product.title}</h5>

                    <p>

                        {product.description.substring(0, 80)}...

                    </p>

                    <h4 className="text-success">

                        ${product.price}

                    </h4>

                </div>

                <div className="card-footer">

                    <Link

                        className="btn btn-primary w-100"

                        to={`/productos/${product.id}`}

                    >

                        Ver detalle

                    </Link>

                </div>

            </div>

        </div>

    );
}
