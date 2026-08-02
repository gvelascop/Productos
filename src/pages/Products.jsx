import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

import { getProducts } from "../services/productService";

export default function Products() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data.products);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {

        return <h3 className="text-danger text-center">{error}</h3>;

    }

    return (

        <>

            <Navbar />

            <div className="container py-4">

                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">
                            <i className="bi bi-box-seam me-2 text-primary"></i>
                            Productos Disponibles
                        </h2>
                        <p className="text-muted mb-0">
                            Explora nuestra selección y encuentra lo que necesitas.
                        </p>
                    </div>

                    <span className="badge bg-primary rounded-pill fs-6 mt-3 mt-md-0">
                        <i className="bi bi-collection me-2"></i>
                        {products.length} productos
                    </span>

                </div>

                <div className="row g-4">

                    {

                        products.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                            />

                        ))

                    }

                </div>

            </div>

        </>

    );

}