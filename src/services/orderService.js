const STORAGE_KEY = "orders";

export function getOrders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(product) {

    const orders = getOrders();

    const exists = orders.find(order => order.id === product.id);

    if (exists) {
        return false;
    }

    orders.push({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        status: "Pendiente"
    });

    saveOrders(orders);

    return true;
}

export function updateOrderStatus(id, status) {

    const orders = getOrders();

    const updated = orders.map(order =>
        order.id === id
            ? { ...order, status }
            : order
    );

    saveOrders(updated);

}