export const exampleQueries = {
    "Simple SELECT": `SELECT id, name, price 
  FROM products 
  WHERE categoryId = 1`,
  
    "Basic JOIN": `SELECT o.id as order_id, c.name as customer_name, o.orderDate
  FROM orders o
  JOIN customers c ON o.customerId = c.id
  WHERE o.status = 'completed'`,
  
    "Order Details": `SELECT 
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
  
    "Sales by Category": `SELECT 
    c.name as category_name,
    COUNT(oi.id) as total_items_sold,
    SUM(oi.quantity * oi.priceAtTime) as total_revenue
  FROM categories c
  JOIN products p ON c.id = p.categoryId
  JOIN orderItems oi ON p.id = oi.productId
  JOIN orders o ON oi.orderId = o.id
  WHERE o.status = 'completed'
  GROUP BY c.name`,
  
    "Customer Purchase History": `SELECT 
    c.name as customer_name,
    r.name as region,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(oi.quantity * oi.priceAtTime) as total_spent
  FROM customers c
  JOIN regions r ON c.regionId = r.id
  LEFT JOIN orders o ON c.id = o.customerId
  LEFT JOIN orderItems oi ON o.id = oi.orderId
  GROUP BY c.name, r.name
  ORDER BY total_spent DESC`,
  
    "Low Stock Alert": `SELECT 
    p.name as product_name,
    p.stock as current_stock,
    c.name as category
  FROM products p
  JOIN categories c ON p.categoryId = c.id
  WHERE p.stock < 50
  ORDER BY p.stock ASC`
  };