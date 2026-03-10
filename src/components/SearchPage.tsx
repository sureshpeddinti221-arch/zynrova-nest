import React from 'react';
import { Search, ArrowLeft, History, TrendingUp, X } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, STORES } from '../constants';

export const SearchPage = ({ onClose, onStoreClick, onProductClick }: any) => {
  const [query, setQuery] = React.useState('');
  
  const productResults = query 
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const storeResults = query
    ? STORES.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const hasResults = productResults.length > 0 || storeResults.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-[100] flex flex-col"
    >
      <div className="p-6 bg-white border-b border-black/5 flex items-center gap-4">
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><ArrowLeft size={22} /></button>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search groceries or stores..." 
            className="w-full pl-12 pr-10 py-3.5 bg-gray-50 rounded-2xl focus:outline-none font-bold text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!query ? (
          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-2 mb-4 text-text-secondary">
                <History size={18} />
                <h3 className="font-black text-sm uppercase tracking-wider">Recent Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Milk', 'Bread', 'Fresh Mart', 'Organic'].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 bg-white rounded-xl border border-black/5 font-bold text-sm text-text-secondary">
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-text-secondary">
                <TrendingUp size={18} />
                <h3 className="font-black text-sm uppercase tracking-wider">Suggested for you</h3>
              </div>
              <div className="space-y-3">
                {PRODUCTS.slice(0, 3).map(p => (
                  <button 
                    key={p.id} 
                    onClick={() => onProductClick(p)}
                    className="w-full flex items-center gap-4 p-3 bg-white rounded-2xl border border-black/5"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <span className="font-black text-sm">{p.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {storeResults.length > 0 && (
              <section>
                <h3 className="font-black text-xs uppercase tracking-widest text-text-secondary mb-4">Stores</h3>
                <div className="space-y-3">
                  {storeResults.map(store => (
                    <button 
                      key={store.id} 
                      onClick={() => onStoreClick(store)}
                      className="w-full flex items-center gap-4 p-3 bg-white rounded-2xl border border-black/5"
                    >
                      <img src={store.logo} alt={store.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <div className="text-left">
                        <p className="font-black text-sm">{store.name}</p>
                        <p className="text-[10px] font-bold text-text-secondary uppercase">{store.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {productResults.length > 0 && (
              <section>
                <h3 className="font-black text-xs uppercase tracking-widest text-text-secondary mb-4">Products</h3>
                <div className="grid grid-cols-2 gap-4">
                  {productResults.map(product => (
                    <motion.div 
                      key={product.id} 
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onProductClick(product)}
                      className="bg-white rounded-[24px] p-3 shadow-premium border border-black/5"
                    >
                      <img src={product.image} alt={product.name} className="w-full aspect-square rounded-[18px] object-cover mb-3" referrerPolicy="no-referrer" />
                      <p className="font-black text-sm mb-1 truncate px-1">{product.name}</p>
                      <p className="text-primary font-black text-base px-1">₹{product.price}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {!hasResults && (
              <div className="py-20 text-center text-text-secondary">
                <p className="font-bold">No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
