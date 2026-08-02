import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getProductById } from "../services/productService";

import { addOrder } from "../services/orderService";

export default function ProductDetail() {

    const handleOrder = () => {

        const success = addOrder(product);

        if (success) {
            alert("Producto agregado al pedido.");
        } else {
            alert("Este producto ya está registrado.");
        }

    };

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProduct() {

            try {

                const data = await getProductById(id);

                setProduct(data);

            }

            catch (err) {

                setError(err.message);

            }

            finally {

                setLoading(false);

            }

        }

        loadProduct();

    }, [id]);

    if (loading)

        return <div className="container py-5 text-center"><div className="spinner-border text-primary" role="status"></div><p className="mt-3">Cargando producto...</p></div>;

    if (error)

        return <div className="container py-5"><div className="alert alert-danger text-center">{error}</div></div>;

    return (

        <>

            <Navbar />

            <div className="container py-4">

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                    <div className="row g-0">

                        <div className="col-lg-5">

                            <img

                                src={product.thumbnail}

                                className="img-fluid h-100 w-100"
                                style={{ objectFit: "cover", minHeight: "320px" }}

                                alt={product.title}

                            />

                        </div>

                        <div className="col-lg-7 p-4 p-lg-5">

                            <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                <span className="badge bg-primary rounded-pill">
                                    <i className="bi bi-tag-fill me-1"></i>
                                    {product.category}
                                </span>
                                <span className="badge bg-success rounded-pill">
                                    <i className="bi bi-box-seam me-1"></i>
                                    {product.stock} disponibles
                                </span>
                            </div>

                            <h2 className="fw-bold mb-3">{product.title}</h2>
                            <p className="text-muted mb-4">{product.description}</p>

                            <h3 className="text-success fw-bold mb-4">${product.price}</h3>

                            <button
                                className="btn btn-success btn-lg"
                                onClick={handleOrder}
                            >
                                <i className="bi bi-cart-plus me-2"></i>
                                Agregar al pedido
                            </button>

                            <hr className="my-4" />

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="p-3 rounded-3 bg-light">
                                        <small className="text-muted d-block">Marca</small>
                                        <strong>{product.brand}</strong>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 rounded-3 bg-light">
                                        <small className="text-muted d-block">Categoría</small>
                                        <strong>{product.category}</strong>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}