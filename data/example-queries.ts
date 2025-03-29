type QueryCategory = {
  [queryName: string]: string;
};

type ExampleQueries = {
  "Basic Queries": QueryCategory;
  "Joins": QueryCategory;
  "Aggregations": QueryCategory;
  "Subqueries": QueryCategory;
  "Advanced Queries": QueryCategory;
  "Data Manipulation": QueryCategory;
};

export const exampleQueries: ExampleQueries = {
  "Basic Queries": {
    "Simple SELECT": `SELECT id, name, price 
FROM products 
WHERE categoryId = 1`,
    
    "DISTINCT Values": `SELECT DISTINCT c.name as category
FROM products p
JOIN categories c ON p.categoryId = c.id
ORDER BY c.name`,

    "Pattern Matching": `SELECT p.name
FROM products p
JOIN categories c ON p.categoryId = c.id
WHERE c.description LIKE '%devices%'
OR p.name LIKE 'Laptop%'`,
  },

  "Joins": {
    "INNER JOIN": `-- Shows completed orders with customer details
SELECT o.id as order_id, c.name as customer_name, o.orderDate
FROM orders o
JOIN customers c ON o.customerId = c.id
WHERE o.status = 'completed'`,

    "LEFT JOIN": `-- Counts total orders per customer, including customers with no orders
SELECT c.name as customer_name, 
  COUNT(o.id) as total_orders,
  COALESCE(SUM(oi.quantity * oi.priceAtTime), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customerId
LEFT JOIN orderItems oi ON o.id = oi.orderId
GROUP BY c.name`,

    "Multiple JOINs": `-- Calculates detailed order information including product details and total price
SELECT 
  o.id as order_id,
  c.name as customer_name,
  p.name as product_name,
  oi.quantity,
  oi.priceAtTime,
  (oi.quantity * oi.priceAtTime) as total_price
FROM orders o
JOIN customers c ON o.customerId = c.id
JOIN orderItems oi ON o.id = oi.orderId
JOIN products p ON oi.productId = p.id`,
  },

  "Aggregations": {
    "Basic GROUP BY": `-- Shows product count and average price per category
SELECT 
  c.name as category,
  COUNT(*) as product_count,
  AVG(p.price) as avg_price
FROM products p
JOIN categories c ON p.categoryId = c.id
GROUP BY c.name`,

    "HAVING Clause": `-- Finds categories with more than 2 products
SELECT 
  c.name as category_name,
  COUNT(p.id) as product_count,
  AVG(p.price) as avg_price
FROM categories c
JOIN products p ON c.id = p.categoryId
GROUP BY c.name
HAVING COUNT(p.id) > 2`,

    "Complex Metrics": `-- Calculates customer purchase statistics
SELECT 
  c.name as customer_name,
  COUNT(DISTINCT o.id) as order_count,
  COALESCE(SUM(oi.quantity * oi.priceAtTime), 0) as total_spent,
  COALESCE(AVG(oi.quantity * oi.priceAtTime), 0) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customerId
LEFT JOIN orderItems oi ON o.id = oi.orderId
GROUP BY c.name`,
  },

  "Subqueries": {
    "IN Subquery": `-- Finds products in specific categories
SELECT name, price
FROM products
WHERE categoryId IN (
  SELECT id 
  FROM categories 
  WHERE name IN ('Electronics', 'Books')
)`,

    "Correlated Subquery": `-- Shows each product's price compared to its category average
SELECT p.name, p.price,
  (SELECT AVG(price) 
   FROM products sub 
   WHERE sub.categoryId = p.categoryId) as category_avg_price
FROM products p`,

    "EXISTS Clause": `-- Finds customers who have made large purchases (over 1000)
  SELECT   c.name, SUM(o2.quantity * o2.priceAtTime) as [Total Order Amount]
  FROM orders o 
    JOIN orderItems o2 ON o.id = o2.orderId
    JOIN customers c ON o.customerId = c.id
  GROUP BY c.name
 HAVING SUM(o2.quantity * o2.priceAtTime) > 1000
`,
  },

  "Advanced Queries": {
    "Rank by Price": `-- Ranks products by price within their category
SELECT 
  p.name,
  p.price,
  c.name as category_name,
  (SELECT COUNT(*) + 1 
   FROM products p2 
   WHERE p2.categoryId = p.categoryId 
   AND p2.price > p.price) as price_rank
FROM products p
JOIN categories c ON p.categoryId = c.id
ORDER BY c.name, p.price DESC`,

    "Running Totals": `-- Calculates cumulative total of order amounts
SELECT 
  a.orderDate,
  a.daily_total,
  (
    SELECT SUM(b.daily_total)
    FROM (
      SELECT 
        o2.orderDate,
        SUM(oi2.quantity * oi2.priceAtTime) as daily_total
      FROM orders o2
      JOIN orderItems oi2 ON o2.id = oi2.orderId
      GROUP BY o2.orderDate
    ) b
    WHERE b.orderDate <= a.orderDate
  ) as running_total
FROM (
  SELECT 
    o.orderDate,
    SUM(oi.quantity * oi.priceAtTime) as daily_total
  FROM orders o
  JOIN orderItems oi ON o.id = oi.orderId
  GROUP BY o.orderDate
) a
ORDER BY a.orderDate`,

    "Moving Average": `-- Calculates average of order amounts
SELECT 
  curr.orderDate,
  curr.daily_total,
  (
    SELECT AVG(daily_total)
    FROM (
      SELECT 
        o.orderDate,
        SUM(oi.quantity * oi.priceAtTime) as daily_total
      FROM orders o
      JOIN orderItems oi ON o.id = oi.orderId
      GROUP BY o.orderDate
    ) prev
    WHERE prev.orderDate <= curr.orderDate
  ) as running_average
FROM (
  SELECT 
    o.orderDate,
    SUM(oi.quantity * oi.priceAtTime) as daily_total
  FROM orders o
  JOIN orderItems oi ON o.id = oi.orderId
  GROUP BY o.orderDate
) curr
ORDER BY curr.orderDate`
  },

  "Data Manipulation": {
    "CASE Statement": `-- Categorizes products by price range
SELECT 
  name,
  price,
  CASE 
    WHEN price < 100 THEN 'Budget'
    WHEN price < 500 THEN 'Mid-Range'
    ELSE 'Premium'
  END as price_category
FROM products`,

    "Date Functions": `-- Summarizes monthly order statistics
SELECT 
  YEAR(orderDate) as year,
  MONTH(orderDate) as month,
  COUNT(*) as order_count,
  SUM(oi.quantity * oi.priceAtTime) as total_revenue
FROM orders o
JOIN orderItems oi ON o.id = oi.orderId
GROUP BY YEAR(orderDate), MONTH(orderDate)
ORDER BY year, month`,

    "String Operations": `-- Demonstrates string manipulation functions
SELECT 
  name,
  CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2))) as formatted_name,
  LENGTH(name) as name_length
FROM products`,
  }
};