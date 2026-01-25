document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
});

function loadOrders() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const container = document.getElementById('orders-container');

    fetch(`http://localhost:8080/api/orders/${user.id}`)
        .then(response => response.json())
        .then(orders => {
            container.innerHTML = '';

            if (orders.length === 0) {
                container.innerHTML = '<p>You have not placed any orders yet.</p>';
                return;
            }

            orders.forEach(order => {
                let itemsHtml = order.items.map(item =>
                    `<li>${item.product.name} (x${item.quantity}) - $${item.priceAtPurchase}</li>`
                ).join('');

                const orderHtml = `
                    <div class="order-card">
                        <div class="order-header">
                            <span>Order #${order.id}</span>
                            <span>Total: $${order.totalPrice.toFixed(2)}</span>
                            <span>Status: ${order.status}</span>
                        </div>
                        <ul class="order-items">
                            ${itemsHtml}
                        </ul>
                    </div>
                `;
                container.innerHTML += orderHtml;
            });
        })
        .catch(err => console.error("Error loading orders:", err));
}