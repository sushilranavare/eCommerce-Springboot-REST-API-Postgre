const API_URL = "http://localhost:8080/api/users";

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const user = await response.json();
                alert("Login Successful!");
                localStorage.setItem('user', JSON.stringify(user)); // Save user session
                window.location.href = 'index.html'; // Redirect to home
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                alert("Registration Successful! Please login.");
                window.location.href = 'login.html';
            } else {
                const msg = await response.text();
                alert("Error: " + msg);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}