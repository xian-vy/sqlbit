export interface Customer {
  id: number;
  name: string;
  email: string | null;
  regionId: number;
}

export interface Order {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  orderDate: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export const customers: Customer[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", regionId: 1 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", regionId: 2 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", regionId: 1 },
  { id: 4, name: "Dana White", email: null, regionId: 3 },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", regionId: 2 },
  { id: 6, name: "Frank Miller", email: "frank@example.com", regionId: 1 },
  { id: 7, name: "Grace Lee", email: "grace@example.com", regionId: 3 },
  { id: 8, name: "Henry Ford", email: null, regionId: 2 },
  { id: 9, name: "Ivy Chen", email: "ivy@example.com", regionId: 1 },
  { id: 10, name: "Jack Black", email: "jack@example.com", regionId: 3 }
];

export const orders: Order[] = [
  { id: 101, customerId: 1, productId: 1, quantity: 2, orderDate: "2025-01-10" },
  { id: 102, customerId: 2, productId: 2, quantity: 5, orderDate: "2025-02-15" },
  { id: 103, customerId: 1, productId: 3, quantity: 1, orderDate: "2025-03-01" },
  { id: 104, customerId: 3, productId: 1, quantity: 3, orderDate: "2025-03-20" },
  { id: 105, customerId: 4, productId: 5, quantity: 1, orderDate: "2025-03-25" },
  { id: 106, customerId: 2, productId: 4, quantity: 2, orderDate: "2025-04-01" },
  { id: 107, customerId: 5, productId: 2, quantity: 4, orderDate: "2025-04-05" },
  { id: 108, customerId: 6, productId: 1, quantity: 1, orderDate: "2025-04-10" },
  { id: 109, customerId: 7, productId: 3, quantity: 3, orderDate: "2025-04-15" },
  { id: 110, customerId: 8, productId: 5, quantity: 2, orderDate: "2025-04-20" },
  { id: 111, customerId: 9, productId: 4, quantity: 1, orderDate: "2025-04-25" },
  { id: 112, customerId: 10, productId: 2, quantity: 3, orderDate: "2025-05-01" },
  { id: 113, customerId: 1, productId: 5, quantity: 2, orderDate: "2025-05-05" },
  { id: 114, customerId: 3, productId: 3, quantity: 4, orderDate: "2025-05-10" },
  { id: 115, customerId: 5, productId: 1, quantity: 1, orderDate: "2025-05-15" }
];

export const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299.99, categoryId: 1 },
  { id: 2, name: "Wireless Mouse", price: 24.99, categoryId: 2 },
  { id: 3, name: "4K Monitor", price: 399.99, categoryId: 1 },
  { id: 4, name: "Mechanical Keyboard", price: 149.99, categoryId: 2 },
  { id: 5, name: "Tablet", price: 599.99, categoryId: 1 },
  { id: 6, name: "USB-C Hub", price: 49.99, categoryId: 2 },
  { id: 7, name: "Gaming Monitor", price: 699.99, categoryId: 1 },
  { id: 8, name: "Webcam Pro", price: 89.99, categoryId: 2 }
];

export const categories: Category[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Accessories" },
  { id: 3, name: "Software" },
  { id: 4, name: "Gaming" }
];

export const regions: Region[] = [
  { id: 1, name: "North America" },
  { id: 2, name: "Europe" },
  { id: 3, name: "Asia" },
  { id: 4, name: "South America" },
  { id: 5, name: "Africa" }
];

export const tableData = {
  customers,
  orders,
  products,
  categories,
  regions
};

export type TableName = keyof typeof tableData;