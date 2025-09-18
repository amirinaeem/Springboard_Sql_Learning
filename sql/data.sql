-- Drop and recreate database
DROP DATABASE IF EXISTS joins_exercise;
CREATE DATABASE joins_exercise;
\c joins_exercise;

-- Owners table
CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

-- Cars table
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  owner_id INT REFERENCES people(id)
);

-- Insert people
INSERT INTO people (first_name, last_name) VALUES
('Bob', 'Hope'),
('Jane', 'Smith'),
('Melody', 'Jones'),
('Sarah', 'Palmer'),
('Alex', 'Miller'),
('Shana', 'Smith'),
('Maya', 'Malarkin');

-- Insert cars
INSERT INTO cars (make, model, year, price, owner_id) VALUES
('Toyota', 'Corolla', 2002, 2999.99, 1),
('Honda', 'Civic', 2012, 13000, 1),
('Nissan', 'Altima', 2016, 24000, 2),
('Subaru', 'Legacy', 2006, 5999.99, 2),
('Ford', 'F150', 2012, 2599.99, 3),
('GMC', 'Yukon', 2016, 13000, 3),
('GMC', 'Yukon', 2014, 23000, 4),
('Toyota', 'Avalon', 2009, 13000, 4),
('Toyota', 'Camry', 2013, 13000, 4),
('Honda', 'Civic', 2001, 7999.99, 5),
('Nissan', 'Altima', 1999, 1899.99, 6),
('Lexus', 'ES350', 1998, 1599.99, 6),
('BMW', '300', 2012, 23000, 6),
('BMW', '700', 2015, 53000, 6);
-- Maya (id=7) has no cars
