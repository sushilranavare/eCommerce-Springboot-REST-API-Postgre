const API_URL = "http://localhost:8080/api/users";

// 1. Handle Login (Manual)
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
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}

// 2. Handle Register
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
} // <--- CLOSED THE REGISTER BLOCK HERE



// GOOGLE LOGIN HANDLER (Updated: No external library needed)
// ---------------------------------------------------------
function handleCredentialResponse(response) {
    console.log("Google function triggered!");

    try {
        // 1. Manually decode the token (fixes "jwt_decode is not defined")
        const data = parseJwt(response.credential);
        console.log("Decoded User:", data);

        // 2. Send to backend
        fetch('http://localhost:8080/api/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                name: data.name
            })
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Server responded with error: " + res.status);
            })
            .then(user => {
                alert("Google Login Successful!");
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'index.html';
            })
            .catch(err => {
                console.error("Login Failed:", err);
                alert("Login failed. Check console for details.");
            });

    } catch (e) {
        console.error("Token Error:", e);
    }
}

// Helper function to decode Google Token without external libraries
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}