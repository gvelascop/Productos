export default function Loading() {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">
                    Cargando...
                </span>
            </div>
        </div>
    );
}