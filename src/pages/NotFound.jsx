import { Link } from "react-router-dom";

export default function NotFound() {

    return (

        <div className="container text-center mt-5">

            <h1
                className="display-1 text-danger"
            >
                404
            </h1>

            <h3>

                Página no encontrada

            </h3>

            <p>

                La dirección que intenta visitar no existe.

            </p>

            <Link

                className="btn btn-primary"

                to="/productos"

            >

                Ir al inicio

            </Link>

        </div>

    );

}