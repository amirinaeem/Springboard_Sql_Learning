-- Drop and recreate database
DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
\c products;

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  can_be_returned BOOLEAN NOT NULL
);

-- Insert initial products
INSERT INTO products (name, price, can_be_returned) VALUES
('chair', 44.00, FALSE),
('stool', 25.99, TRUE),
('table', 124.00, FALSE);
