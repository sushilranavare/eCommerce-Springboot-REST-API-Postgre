document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-body');
    const totalDiv = document.getElementById('cart-total');

    tbody.innerHTML = '';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})" style="color:red; cursor:pointer;">Remove</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    totalDiv.innerText = `Total: $${grandTotal.toFixed(2)}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Please login to checkout!");
        window.location.href = "login.html";
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Prepare data for the Backend API (Day 6 OrderController)
    const orderRequest = {
        userId: user.id,
        items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }))
    };

    fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderRequest)
    })
        .then(res => {
            if (res.ok) {
                alert("Order placed successfully!");
                localStorage.removeItem('cart'); // Clear cart
                window.location.href = "index.html";
            } else {
                alert("Failed to place order.");
            }
        })
        .catch(err => console.error(err));
}