document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    // We can use a relative path because this file is served by the same server
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('product-list');
            container.innerHTML = ''; // Clear loading text

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>$${product.price}</strong></p>
                    <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
}