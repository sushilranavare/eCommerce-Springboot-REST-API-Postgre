-- 1. Create the database (Run this separately if needed)
-- CREATE DATABASE ecommerce_db;

-- 2. Switch to the database context if running in CLI
-- \c ecommerce_db;

-- 3. Users Table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL, -- Store hashed passwords in real apps
                       email VARCHAR(100) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products Table
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL,
                          image_url VARCHAR(255),
                          stock_quantity INT DEFAULT 0,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Orders Table
CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        user_id INT REFERENCES users(id),
                        total_price DECIMAL(10, 2) NOT NULL,
                        status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, CANCELLED
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Order Items Table (Linking Products to Orders)
CREATE TABLE order_items (
                             id SERIAL PRIMARY KEY,
                             order_id INT REFERENCES orders(id) ON DELETE CASCADE,
                             product_id INT REFERENCES products(id),
                             quantity INT NOT NULL,
                             price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- ---------------------------------------------------------
-- SEED DATA (Run this to have data for Day 4 API testing)
-- ---------------------------------------------------------

-- Insert Dummy Products
INSERT INTO products (name, description, price, image_url, stock_quantity) VALUES
                                                                               ('Wireless Headphones', 'Noise cancelling over-ear headphones', 99.99, 'https://via.placeholder.com/150', 50),
                                                                               ('Smart Watch', 'Fitness tracker and notification sync', 149.50, 'https://via.placeholder.com/150', 30),
                                                                               ('Mechanical Keyboard', 'RGB backlit gaming keyboard', 75.00, 'https://via.placeholder.com/150', 20),
                                                                               ('Gaming Mouse', 'High precision optical mouse', 45.00, 'https://via.placeholder.com/150', 40);

-- Insert a Test User (password is 'password123' - typically you'd hash this in Java)
INSERT INTO users (username, password, email) VALUES
    ('testuser', 'password123', 'test@example.com');