-- Drop and recreate database
DROP DATABASE IF EXISTS playstore;
CREATE DATABASE playstore;
\c playstore;

-- Create analytics table
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  app TEXT NOT NULL,
  category TEXT NOT NULL,
  rating NUMERIC(3,2),
  reviews INT DEFAULT 0,
  price NUMERIC(6,2) DEFAULT 0,
  min_installs INT DEFAULT 0,
  last_updated DATE
);

-- Insert sample apps
INSERT INTO analytics (app, category, rating, reviews, price, min_installs, last_updated) VALUES
('Facebook', 'Social', 4.1, 5000000, 0, 1000000000, '2018-08-01'),
('Instagram', 'Social', 4.5, 4000000, 0, 1000000000, '2018-07-15'),
('WhatsApp', 'Communication', 4.6, 6000000, 0, 1000000000, '2018-07-20'),
('Angry Birds', 'Game', 4.3, 2000000, 0.99, 10000000, '2018-06-01'),
('Minecraft', 'Game', 4.7, 3000000, 6.99, 50000000, '2018-08-01'),
('Evernote', 'Productivity', 4.2, 500000, 0, 10000000, '2018-05-15'),
('FakeApp', 'Utility', 2.5, 200, 49.99, 1000, '2017-01-01');
