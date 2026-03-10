import React from 'react';
import { Search, Bell, MapPin, ChevronRight, Star, Clock, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES, STORES, PRODUCTS } from '../constants';
import { Product, Store } from '../types';

export const Home = ({ 
  onStoreClick, 
  onProductClick, 
  onAddToCart,
  onSearchClick,
  onNotificationsClick
}: any) => {
  return (
    <div className="pb-32">
      {/* Top Bar */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <MapPin size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">My Apartment</p>
            <button className="flex items-center gap-1 font-black text-sm">
              Block B • 402 <ChevronRight size={14} className="text-primary" />
            </button>
          </div>
        </div>
        <button 
          onClick={onNotificationsClick}
          className="w-10 h-10 bg-white rounded-2xl shadow-premium flex items-center justify-center relative"
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <button 
          onClick={onSearchClick}
          className="w-full h-14 bg-white rounded-full shadow-premium flex items-center px-6 gap-3 text-text-secondary border border-black/5"
        >
          <Search size={20} />
          <span className="text-sm font-medium">Search groceries or stores...</span>
        </button>
      </div>

      {/* Banner Carousel */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20">
          <div className="relative z-10 max-w-[60%]">
            <h2 className="text-2xl font-black mb-1">20% OFF</h2>
            <p className="text-sm font-bold opacity-90 mb-4">On your first grocery order today!</p>
            <button className="bg-white text-primary px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">Claim Now</button>
          </div>
          <div className="absolute -right-6 -bottom-6 opacity-20 text-[140px] rotate-12">🛒</div>
        </div>
      </div>

      {/* Quick Categories */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="font-black">Quick Categories</h3>
          <button className="text-primary text-xs font-black uppercase tracking-wider">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-16 h-16 bg-white rounded-[20px] shadow-premium flex items-center justify-center text-2xl border border-black/5">
                {cat.icon}
              </div>
              <p className="text-[11px] font-bold text-text-secondary">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Stores */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="font-black">Nearby Stores</h3>
          <button className="text-primary text-xs font-black uppercase tracking-wider">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {STORES.map(store => (
            <motion.div 
              key={store.id} 
              whileTap={{ scale: 0.98 }}
              onClick={() => onStoreClick(store)}
              className="min-w-[260px] bg-white rounded-[24px] p-4 shadow-premium border border-black/5"
            >
              <div className="flex gap-4 mb-4">
                <img src={store.logo} alt={store.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <p className="font-black text-lg leading-tight mb-1">{store.name}</p>
                  <p className="text-xs font-bold text-text-secondary">{store.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                  <Star size={14} fill="currentColor" /> {store.rating}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary bg-gray-50 px-2 py-1 rounded-lg">
                  <Clock size={14} /> {store.deliveryTime}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black">Popular Items</h3>
          <button className="text-primary text-xs font-black uppercase tracking-wider">See All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map(product => (
            <motion.div 
              key={product.id} 
              whileTap={{ scale: 0.98 }}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-[24px] p-3 shadow-premium border border-black/5"
            >
              <div className="relative mb-3">
                <img src={product.image} alt={product.name} className="w-full aspect-square rounded-[18px] object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-xl shadow-lg flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Plus size={20} />
                </button>
              </div>
              <p className="font-black text-sm mb-1 truncate px-1">{product.name}</p>
              <p className="text-primary font-black text-base px-1">₹{product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
