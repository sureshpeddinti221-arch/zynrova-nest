import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  ShoppingBag, 
  User, 
  LayoutGrid,
  Bell,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Plus,
  Minus,
  ArrowLeft,
  Filter,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle2,
  Phone,
  LogOut,
  Settings as SettingsIcon,
  HelpCircle,
  CreditCard as PaymentIcon,
  MapPin as AddressIcon,
  History
} from 'lucide-react';

import { Product, Store, Category, CartItem, Order } from './types';
import { CATEGORIES, STORES, PRODUCTS } from './constants';
import { SplashScreen, Onboarding, Login, ApartmentSetup } from './components/AuthFlow';
import { Home } from './components/Home';
import { StorePage, ProductPage } from './components/StoreProduct';
import { Cart, Checkout, OrderSuccess, OrderTracking } from './components/CheckoutFlow';
import { SearchPage } from './components/SearchPage';

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState<'splash' | 'onboarding' | 'login' | 'setup' | 'main'>('splash');
  const [activeTab, setActiveTab] = useState('HOME');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const placeOrder = () => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 25,
      status: 'Preparing',
      date: new Date().toLocaleDateString()
    };
    setOrders([newOrder, ...orders]);
    setCurrentOrder(newOrder);
    setCart([]);
    setShowCheckout(false);
    setShowOrderSuccess(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'HOME':
        return (
          <Home 
            onSearchClick={() => setShowSearch(true)}
            onStoreClick={setSelectedStore}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        );
      case 'CATEGORIES':
        return (
          <div className="p-6 pb-32">
            <h1 className="text-2xl font-black mb-6">Categories</h1>
            <div className="grid grid-cols-3 gap-4">
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square bg-white rounded-2xl shadow-premium flex items-center justify-center text-3xl">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-center">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ORDERS':
        return (
          <div className="p-6 pb-32">
            <h1 className="text-2xl font-black mb-6">My Orders</h1>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-text-secondary font-bold">No orders yet</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-white p-5 rounded-2xl shadow-premium border border-black/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">{order.id}</p>
                        <p className="font-black text-lg">₹{order.total}</p>
                      </div>
                      <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                        {order.status}
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary font-bold mb-4">{order.items.length} Items • {order.date}</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setCurrentOrder(order);
                          setShowOrderTracking(true);
                        }}
                        className="flex-1 py-3 bg-gray-50 rounded-xl font-black text-xs uppercase tracking-widest border border-black/5"
                      >
                        Track
                      </button>
                      <button className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/10">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case 'CART':
        return (
          <Cart 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={() => setShowCheckout(true)}
          />
        );
      case 'PROFILE':
        return (
          <div className="pb-32">
            <div className="bg-primary p-8 pt-16 text-white rounded-b-[40px] mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center text-3xl font-black border border-white/30 shadow-xl">
                  JD
                </div>
                <div>
                  <h2 className="text-2xl font-black">John Doe</h2>
                  <p className="opacity-80 font-medium">+91 98765 43210</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 space-y-6">
              <div className="bg-white rounded-3xl shadow-premium border border-black/5 overflow-hidden">
                {[
                  { icon: <History size={20} />, label: "My Orders", tab: "ORDERS" },
                  { icon: <AddressIcon size={20} />, label: "Saved Addresses" },
                  { icon: <PaymentIcon size={20} />, label: "Payments" },
                  { icon: <Bell size={20} />, label: "Notifications" },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => item.tab && setActiveTab(item.tab)}
                    className="w-full flex items-center justify-between p-5 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-primary">{item.icon}</div>
                      <span className="font-bold">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-3xl shadow-premium border border-black/5 overflow-hidden">
                {[
                  { icon: <HelpCircle size={20} />, label: "Help Center" },
                  { icon: <SettingsIcon size={20} />, label: "Settings" },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-text-secondary">{item.icon}</div>
                      <span className="font-bold">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                ))}
              </div>

              <button className="w-full flex items-center gap-4 p-5 text-error font-black bg-error/5 rounded-2xl active:scale-95 transition-transform" onClick={() => setView('login')}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-background shadow-2xl relative overflow-hidden font-sans text-text-primary">
      <AnimatePresence mode="wait">
        {view === 'splash' && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashScreen onComplete={() => setView('onboarding')} />
          </motion.div>
        )}
        {view === 'onboarding' && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Onboarding onComplete={() => setView('login')} />
          </motion.div>
        )}
        {view === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Login onComplete={() => setView('setup')} />
          </motion.div>
        )}
        {view === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ApartmentSetup onComplete={() => setView('main')} />
          </motion.div>
        )}
        
        {view === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {renderTabContent()}
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-black/5 px-6 py-4 flex justify-between items-center z-50 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
              {[
                { id: 'HOME', icon: <HomeIcon size={22} />, label: 'Home' },
                { id: 'CATEGORIES', icon: <LayoutGrid size={22} />, label: 'Shop' },
                { id: 'ORDERS', icon: <ShoppingBag size={22} />, label: 'Orders' },
                { id: 'CART', icon: <div className="relative"><ShoppingBag size={22} />{cart.length > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-black border-2 border-white">{cart.length}</div>}</div>, label: 'Cart' },
                { id: 'PROFILE', icon: <User size={22} />, label: 'Profile' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'text-primary scale-110' : 'text-gray-300'}`}
                >
                  {tab.icon}
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <AnimatePresence>
        {selectedStore && (
          <StorePage 
            store={selectedStore} 
            onClose={() => setSelectedStore(null)}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
          />
        )}
        {selectedProduct && (
          <ProductPage 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
        {showSearch && (
          <SearchPage 
            onClose={() => setShowSearch(false)}
            onStoreClick={setSelectedStore}
            onProductClick={setSelectedProduct}
          />
        )}
        {showCheckout && (
          <Checkout 
            total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 25}
            onClose={() => setShowCheckout(false)}
            onPlaceOrder={placeOrder}
            onBack={() => setShowCheckout(false)}
          />
        )}
        {showOrderSuccess && (
          <OrderSuccess 
            onClose={() => setShowOrderSuccess(false)}
            onTrack={() => {
              setShowOrderSuccess(false);
              setShowOrderTracking(true);
            }}
            onContinue={() => setShowOrderSuccess(false)}
          />
        )}
        {showOrderTracking && currentOrder && (
          <OrderTracking 
            order={currentOrder}
            onClose={() => setShowOrderTracking(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
