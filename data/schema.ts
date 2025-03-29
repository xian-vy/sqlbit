export interface Customer {
  id: number;
  name: string;
  email: string | null;
  regionId: number;
}

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtTime: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Region {
  id: number;
  name: string;
  code: string;
}

export const customers: Customer[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", regionId: 1 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", regionId: 2 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", regionId: 1 },
  { id: 4, name: "Dana White", email: null, regionId: 3 },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", regionId: 2 }
];

export const orders: Order[] = [
  { id: 1, customerId: 1, orderDate: "2025-01-10", status: "completed" },
  { id: 2, customerId: 2, orderDate: "2025-02-15", status: "completed" },
  { id: 3, customerId: 1, orderDate: "2025-03-01", status: "pending" },
  { id: 4, customerId: 3, orderDate: "2025-03-20", status: "cancelled" },
  { id: 5, customerId: 4, orderDate: "2025-03-25", status: "completed" }
];

export const orderItems: OrderItem[] = [
  { id: 1, orderId: 1, productId: 1, quantity: 1, priceAtTime: 1299.99 },
  { id: 2, orderId: 1, productId: 2, quantity: 2, priceAtTime: 24.99 },
  { id: 3, orderId: 2, productId: 3, quantity: 1, priceAtTime: 399.99 },
  { id: 4, orderId: 3, productId: 4, quantity: 1, priceAtTime: 149.99 },
  { id: 5, orderId: 3, productId: 5, quantity: 2, priceAtTime: 599.99 },
  { id: 6, orderId: 4, productId: 1, quantity: 1, priceAtTime: 1299.99 },
  { id: 7, orderId: 5, productId: 2, quantity: 3, priceAtTime: 24.99 }
];

export const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299.99, categoryId: 1, stock: 50 },
  { id: 2, name: "Wireless Mouse", price: 24.99, categoryId: 2, stock: 100 },
  { id: 3, name: "4K Monitor", price: 399.99, categoryId: 1, stock: 30 },
  { id: 4, name: "Mechanical Keyboard", price: 149.99, categoryId: 2, stock: 75 },
  { id: 5, name: "Tablet", price: 599.99, categoryId: 1, stock: 45 }
];

export const categories: Category[] = [
  { id: 1, name: "Electronics", description: "Electronic devices and gadgets" },
  { id: 2, name: "Accessories", description: "Computer and device accessories" },
  { id: 3, name: "Software", description: "Digital software and applications" }
];

export const regions: Region[] = [
  { id: 1, name: "North America", code: "NA" },
  { id: 2, name: "Europe", code: "EU" },
  { id: 3, name: "Asia", code: "AS" }
];

export const tableData = {
  customers,
  orders,
  orderItems,
  products,
  categories,
  regions
};

export type TableName = keyof typeof tableData;