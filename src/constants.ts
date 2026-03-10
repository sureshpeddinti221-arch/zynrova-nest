import { Category, Product, Store } from "./types";

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Groceries', icon: '🛒' },
  { id: '2', name: 'Vegetables', icon: '🥦' },
  { id: '3', name: 'Fruits', icon: '🍎' },
  { id: '4', name: 'Dairy', icon: '🥛' },
  { id: '5', name: 'Snacks', icon: '🍿' },
  { id: '6', name: 'Food', icon: '🍔' },
  { id: '7', name: 'Medicine', icon: '💊' },
];

export const STORES: Store[] = [
  { id: 's1', name: 'Fresh Mart', logo: 'https://picsum.photos/seed/mart/100/100', rating: 4.6, deliveryTime: '10 min', category: 'Groceries' },
  { id: 's2', name: 'Green Valley', logo: 'https://picsum.photos/seed/green/100/100', rating: 4.8, deliveryTime: '15 min', category: 'Vegetables' },
  { id: 's3', name: 'Daily Dairy', logo: 'https://picsum.photos/seed/dairy/100/100', rating: 4.4, deliveryTime: '8 min', category: 'Dairy' },
  { id: 's4', name: 'Bake House', logo: 'https://picsum.photos/seed/bake/100/100', rating: 4.7, deliveryTime: '20 min', category: 'Bakery' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Bananas', price: 40, image: 'https://picsum.photos/seed/banana/200/200', category: 'Fruits', description: 'Fresh organic bananas from local farms.', storeId: 's1' },
  { id: 'p2', name: 'Whole Milk 1L', price: 65, image: 'https://picsum.photos/seed/milk/200/200', category: 'Dairy', description: 'Pure farm fresh whole milk.', storeId: 's3' },
  { id: 'p3', name: 'Sourdough Bread', price: 120, image: 'https://picsum.photos/seed/bread/200/200', category: 'Bakery', description: 'Freshly baked sourdough bread.', storeId: 's4' },
  { id: 'p4', name: 'Red Tomatoes 1kg', price: 30, image: 'https://picsum.photos/seed/tomato/200/200', category: 'Vegetables', description: 'Ripe red tomatoes.', storeId: 's2' },
  { id: 'p5', name: 'Lays Classic', price: 20, image: 'https://picsum.photos/seed/chips/200/200', category: 'Snacks', description: 'Classic salted potato chips.', storeId: 's1' },
  { id: 'p6', name: 'Greek Yogurt', price: 80, image: 'https://picsum.photos/seed/yogurt/200/200', category: 'Dairy', description: 'Creamy greek yogurt.', storeId: 's3' },
];
