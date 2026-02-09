# Spring Boot Full-Stack E-Commerce App

A complete E-Commerce application built from scratch using **Java Spring Boot 4**, **PostgreSQL**, and **Vanilla JavaScript**. This project features a RESTful API backend, a relational database with complex mappings, and a responsive frontend with dual authentication (Manual + Google OAuth).

## Technologies Used

### Backend

* **Language:** Java 25
* **Framework:** Spring Boot 4.0.1
* **Database:** PostgreSQL 16+
* **ORM:** Hibernate & Spring Data JPA
* **Build Tool:** Maven

### Frontend

* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **Networking:** Fetch API
* **Authentication:** Google Identity Services (OAuth 2.0)

---

## Key Features

1. **User Authentication:**
* User Registration & Login (BCrypt password handling).
* **Google Sign-In Integration** (OAuth 2.0).
* Session management via LocalStorage.


2. **Product Catalog:**
* Automatic data seeding (Products are created on startup).
* Dynamic product fetching via API.


3. **Shopping Cart:**
* Add items to cart.
* Real-time total calculation.
* Checkout process with database transaction.


4. **Order Management:**
* Order persistence in PostgreSQL.
* **Order History Page:** View past orders and status.
* Relational mapping (User -> Orders -> OrderItems).



---

## Setup & Installation

### 1. Prerequisites

* Java JDK 25 installed.
* PostgreSQL installed and running.
* Google Cloud Console Project (for Client ID).

### 2. Database Configuration

Open your terminal and create the database:

```bash
sudo -u postgres psql
CREATE DATABASE ecommerce_db;
\q

```

### 3. Application Configuration

Update `src/main/resources/application.properties` if your database credentials differ:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

```

### 4. Google Auth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create credentials and add `http://localhost:8080` to **Authorized JavaScript origins**.
3. Open `src/main/resources/static/login.html`.
4. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID.

### 5. Running the App

Run the following command in the project root:

```bash
./mvnw spring-boot:run

```

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login with username/password |
| `POST` | `/api/users/google-login` | Login/Register via Google |
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/orders/{userId}` | Create a new order (Checkout) |
| `GET` | `/api/orders/{userId}` | Get user's order history |

---

## Project Structure

```text
src/main/java/com/my/ecommerce
├── controller   # REST Controllers (API endpoints)
├── model        # JPA Entities (User, Product, Order)
├── repository   # Database Interfaces
├── service      # Business Logic
└── EcommerceApplication.java  # Main Entry Point

src/main/resources/static
├── css          # Styles
├── js           # Frontend Logic (auth.js, cart.js, orders.js)
├── index.html   # Storefront
├── login.html   # Auth Page
└── ...

```

## Troubleshooting

* **Google 403 Error:** Ensure `http://localhost:8080` is added to "Authorized JavaScript origins" in Google Console.
* **JSON Infinite Loop:** Ensure `@JsonIgnore` is added to the `Order` field inside `OrderItem.java`.
* **Database Connection Refused:** Check if Postgres service is active: `sudo systemctl status postgresql`.

---

**Author:** Sushil
**License:** MIT