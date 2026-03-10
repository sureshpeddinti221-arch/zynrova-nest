import React from 'react';
import { ArrowLeft, Star, Clock, Plus, Minus, Share2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';

export const StorePage = ({ store, onClose, onProductClick, onAddToCart }: any) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-background z-50 overflow-y-auto"
    >
      <div className="relative h-72">
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <button onClick={onClose} className="w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <ArrowLeft size={22} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center"><Heart size={20} /></button>
            <button className="w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center"><Share2 size={20} /></button>
          </div>
        </div>
        <img src={store.logo} alt={store.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-black mb-2">{store.name}</h1>
          <div className="flex items-center gap-4 text-sm font-bold">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Star size={16} fill="currentColor" /> {store.rating} (120+ Reviews)
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <Clock size={16} /> {store.deliveryTime}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
          {['Products', 'Reviews', 'About'].map((tab, i) => (
            <button key={tab} className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-text-secondary border border-black/5'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.filter((p: any) => p.storeId === store.id).map((product: any) => (
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
                  className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-xl shadow-lg flex items-center justify-center"
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
    </motion.div>
  );
};

export const ProductPage = ({ product, onClose, onAddToCart }: any) => {
  const [qty, setQty] = React.useState(1);

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-white z-[60] overflow-y-auto"
    >
      <div className="relative">
        <button onClick={onClose} className="absolute top-6 left-6 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center z-10">
          <ArrowLeft size={22} />
        </button>
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <h1 className="text-3xl font-black mb-2 leading-tight">{product.name}</h1>
            <p className="text-primary text-3xl font-black">₹{product.price}</p>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-black/5">
            <button 
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-text-secondary active:scale-90"
            >
              <Minus size={20} />
            </button>
            <span className="font-black text-xl w-6 text-center">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary active:scale-90"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-8 mb-32">
          <section>
            <h3 className="font-black mb-3">Description</h3>
            <p className="text-text-secondary leading-relaxed font-medium">{product.description}</p>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black">Reviews</h3>
              <button className="text-primary text-xs font-black uppercase tracking-wider">See All</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-black/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">AM</div>
                <p className="font-black text-sm">Ankit Mishra</p>
                <div className="flex items-center gap-0.5 text-orange-400 ml-auto">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
              </div>
              <p className="text-xs text-text-secondary font-medium">Super fresh and delivered in just 10 minutes! Amazing service by Zynrova.</p>
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-black/5 flex gap-4">
          <button 
            onClick={() => { onAddToCart(product, qty); onClose(); }}
            className="flex-1 bg-white border-2 border-primary text-primary py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            Add to Cart
          </button>
          <button 
            onClick={() => { onAddToCart(product, qty); onClose(); }}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
