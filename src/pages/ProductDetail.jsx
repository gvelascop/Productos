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

        return <h3 className="text-center mt-5">Cargando...</h3>;

    if (error)

        return <h3 className="text-danger text-center">{error}</h3>;

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="row">

                    <div className="col-md-5">

                        <img

                            src={product.thumbnail}

                            className="img-fluid rounded"

                            alt={product.title}

                        />

                    </div>

                    <div className="col-md-7">

                        <h2>{product.title}</h2>

                        <p>{product.description}</p>

                        <h3 className="text-success">

                            ${product.price}

                        </h3>

                        <button
                            className="btn btn-success mt-3"
                            onClick={handleOrder}
                        >
                            Agregar al pedido
                        </button>

                        <p>

                            <strong>Marca:</strong> {product.brand}

                        </p>

                        <p>

                            <strong>Categoría:</strong> {product.category}

                        </p>

                        <p>

                            <strong>Stock:</strong> {product.stock}

                        </p>

                    </div>

                </div>

            </div>

        </>

    );
}
