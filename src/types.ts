export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  storeId: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryTime: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Placed' | 'Preparing' | 'Out for delivery' | 'Delivered';
  total: number;
  items: CartItem[];
}
