import React from 'react';
import { ShoppingCart, MapPin, Minus, Plus, CreditCard, Wallet, CheckCircle2, ArrowLeft, Clock, Phone, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Cart = ({ cart, onUpdateQuantity, onRemove, onCheckout }: any) => {
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const delivery = 20;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10 text-center pb-32">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-black/5">
          <ShoppingCart size={48} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
        <p className="text-text-secondary font-medium mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-40">
      <h1 className="text-3xl font-black mb-8">My Cart</h1>
      
      <div className="space-y-4 mb-10">
        {cart.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded-[24px] shadow-premium border border-black/5 flex gap-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 py-1">
              <div className="flex justify-between items-start mb-1">
                <p className="font-black text-lg">{item.name}</p>
                <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-error transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-primary font-black mb-3">₹{item.price}</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-text-secondary border border-black/5"
                >
                  <Minus size={16} />
                </button>
                <span className="font-black">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-primary border border-black/5"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[24px] shadow-premium border border-black/5 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Deliver to</p>
            <p className="font-black text-sm">Block B • 402, Zynrova Nest</p>
          </div>
          <button className="text-primary text-xs font-black uppercase tracking-wider">Change</button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm font-bold text-text-secondary">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-text-secondary">
            <span>Delivery Fee</span>
            <span>₹{delivery}</span>
          </div>
          <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-50">
            <span>Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onCheckout}
        className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export const Checkout = ({ total, onPlaceOrder, onBack }: any) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-background z-[70] flex flex-col"
    >
      <div className="p-6 flex items-center gap-4 bg-white border-b border-black/5">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><ArrowLeft size={22} /></button>
        <h2 className="text-xl font-black">Checkout</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <h3 className="font-black mb-4">Payment Method</h3>
          <div className="space-y-3">
            {[
              { id: 'upi', label: 'UPI (PhonePe/GPay)', icon: <Wallet size={20} />, active: true },
              { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
              { id: 'cash', label: 'Cash on Delivery', icon: <Wallet size={20} /> },
            ].map(method => (
              <div key={method.id} className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${method.active ? 'border-primary bg-primary/5' : 'border-black/5 bg-white'}`}>
                <div className="flex items-center gap-4">
                  <div className={`${method.active ? 'text-primary' : 'text-text-secondary'}`}>{method.icon}</div>
                  <span className="font-black text-sm">{method.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method.active ? 'border-primary' : 'border-gray-200'}`}>
                  {method.active && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-black mb-4">Apply Coupon</h3>
          <div className="flex gap-3">
            <input type="text" placeholder="Enter coupon code" className="flex-1 bg-white border border-black/5 rounded-xl px-4 font-bold text-sm" />
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider">Apply</button>
          </div>
        </section>
      </div>

      <div className="p-6 bg-white border-t border-black/5">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Amount to pay</p>
            <p className="text-2xl font-black text-primary">₹{total}</p>
          </div>
          <p className="text-xs font-bold text-text-secondary">All taxes included</p>
        </div>
        <button 
          onClick={onPlaceOrder}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Place Order
        </button>
      </div>
    </motion.div>
  );
};

export const OrderSuccess = ({ onTrack, onContinue }: any) => {
  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col items-center justify-center p-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8"
      >
        <CheckCircle2 size={64} />
      </motion.div>
      <h1 className="text-4xl font-black mb-4 tracking-tight">Order Confirmed!</h1>
      <p className="text-text-secondary font-medium mb-12 leading-relaxed">
        Your order has been placed successfully. Our partner is already at the store picking up your items.
      </p>
      <div className="w-full space-y-4">
        <button 
          onClick={onTrack}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20"
        >
          Track Order
        </button>
        <button 
          onClick={onContinue}
          className="w-full bg-white border-2 border-primary text-primary py-5 rounded-2xl font-black uppercase tracking-widest"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export const OrderTracking = ({ order, onClose }: any) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-background z-[90] flex flex-col"
    >
      <div className="p-6 flex items-center gap-4 bg-white border-b border-black/5">
        <button onClick={onClose} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><ArrowLeft size={22} /></button>
        <h2 className="text-xl font-black">Track Order</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white p-8 rounded-[32px] shadow-premium border border-black/5 mb-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">Estimated Arrival</p>
              <p className="text-3xl font-black text-primary">12-15 MIN</p>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Clock size={32} />
            </div>
          </div>

          <div className="space-y-10 relative">
            <div className="absolute left-[13px] top-2 bottom-2 w-1 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-1/2 bg-primary w-full" />
            </div>
            {[
              { label: "Order Placed", time: "10:30 AM", active: true },
              { label: "Preparing your order", time: "10:35 AM", active: true },
              { label: "Out for delivery", time: "Pending", active: false },
              { label: "Arrived at your door", time: "Pending", active: false },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className={`w-7 h-7 rounded-full border-4 border-white shadow-md flex items-center justify-center ${step.active ? 'bg-primary' : 'bg-gray-200'}`}>
                  {step.active && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <div>
                  <p className={`font-black text-sm ${step.active ? 'text-text-primary' : 'text-text-secondary'}`}>{step.label}</p>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-[24px] shadow-premium border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden">
              <img src="https://picsum.photos/seed/delivery/100/100" alt="Partner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="font-black text-lg">Vikram Singh</p>
              <p className="text-xs font-bold text-text-secondary">Your Delivery Partner</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center active:scale-90 transition-transform">
            <Phone size={22} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
