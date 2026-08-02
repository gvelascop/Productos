import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
    getOrders,
    updateOrderStatus
} from "../services/orderService";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(getOrders());
    }, []);

    const changeStatus = (id, status) => {

        updateOrderStatus(id, status);

        setOrders(getOrders());

    };

    return (

        <>

            <Navbar />

            <div className="container py-4">

                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            <i className="bi bi-bag-check me-2 text-primary"></i>
                            Mis Pedidos
                        </h2>
                        <p className="text-muted mb-0">Gestiona el estado de tus productos seleccionados.</p>
                    </div>
                    <span className="badge bg-primary rounded-pill fs-6 mt-3 mt-md-0">
                        <i className="bi bi-list-check me-2"></i>
                        {orders.length} pedidos
                    </span>
                </div>

                {

                    orders.length === 0 ? (

                        <div className="alert alert-warning d-flex align-items-center">
                            <i className="bi bi-info-circle-fill me-2"></i>
                            No existen pedidos registrados.
                        </div>

                    ) : (

                        <div className="row g-4">

                            {

                                orders.map(order => (

                                    <div
                                        key={order.id}
                                        className="col-md-6"
                                    >

                                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">

                                            <img
                                                src={order.thumbnail}
                                                className="card-img-top"
                                                style={{
                                                    height: "220px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                            <div className="card-body d-flex flex-column">

                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="fw-bold mb-0">{order.title}</h5>
                                                    <span className="badge bg-success rounded-pill">
                                                        <i className="bi bi-cash-stack me-1"></i>
                                                        ${order.price}
                                                    </span>
                                                </div>

                                                <p className="text-muted mb-3">
                                                    Estado actual del pedido
                                                </p>

                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">
                                                        <i className="bi bi-arrow-repeat me-2"></i>
                                                        Cambiar estado
                                                    </label>
                                                    <select

                                                        className="form-select"

                                                        value={order.status}

                                                        onChange={(e) =>
                                                            changeStatus(
                                                                order.id,
                                                                e.target.value
                                                            )
                                                        }

                                                    >

                                                        <option>Pendiente</option>
                                                        <option>Confirmado</option>
                                                        <option>Enviado</option>
                                                        <option>Cancelado</option>

                                                    </select>
                                                </div>

                                                <div className="mt-auto">
                                                    <span className="badge bg-light text-dark border">
                                                        <i className="bi bi-circle-fill me-1 text-primary"></i>
                                                        {order.status}
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </>

    );

}