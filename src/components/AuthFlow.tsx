import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center text-white z-[100]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-black tracking-tighter mb-2">ZYNROVA</h1>
        <div className="bg-white text-primary px-3 py-1 rounded-lg font-black text-xl inline-block mb-4">NEST</div>
        <p className="text-lg font-medium opacity-90">Apartment Delivery Made Easy</p>
      </motion.div>
    </motion.div>
  );
};

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [slide, setSlide] = React.useState(0);
  const slides = [
    { title: "Order from nearby stores", desc: "Get everything you need from stores right outside your gate.", img: "🏢" },
    { title: "Delivered to your door", desc: "Our partners deliver directly to your apartment door.", img: "🚚" },
    { title: "Groceries & more in minutes", desc: "Fresh essentials delivered faster than you can imagine.", img: "🧺" }
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <motion.div 
          key={slide}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="w-full"
        >
          <div className="text-[120px] mb-10 drop-shadow-xl">{slides[slide].img}</div>
          <h1 className="text-3xl font-black mb-4 leading-tight">{slides[slide].title}</h1>
          <p className="text-text-secondary text-lg">{slides[slide].desc}</p>
        </motion.div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'bg-primary w-8' : 'bg-gray-200 w-2'}`} />
          ))}
        </div>
        <button 
          onClick={() => slide < 2 ? setSlide(slide + 1) : onComplete()}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          {slide === 2 ? "Start Ordering" : "Next"}
        </button>
      </div>
    </div>
  );
};

export const Login = ({ onComplete }: { onComplete: () => void }) => (
  <div className="h-screen p-8 flex flex-col bg-white">
    <div className="flex-1 flex flex-col pt-20">
      <div className="text-6xl mb-8">🔐</div>
      <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome Back</h1>
      <p className="text-text-secondary font-medium mb-12">Enter your phone number to continue to Zynrova Nest</p>
      
      <div className="bg-gray-50 p-6 rounded-[24px] border border-black/5 mb-8">
        <div className="flex gap-4 mb-6">
          <div className="px-5 py-4 bg-white rounded-2xl border border-black/5 font-black text-lg">+91</div>
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="flex-1 px-5 py-4 bg-white rounded-2xl border border-black/5 font-black text-lg focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button 
          onClick={onComplete}
          className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Send OTP
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs font-black text-gray-300 uppercase tracking-widest">OR</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <button className="w-full bg-white border-2 border-black/5 py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-transform">
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>
    </div>
  </div>
);

export const ApartmentSetup = ({ onComplete }: { onComplete: () => void }) => (
  <div className="h-screen p-8 flex flex-col bg-white">
    <div className="flex-1 flex flex-col pt-20">
      <div className="text-6xl mb-8">🏢</div>
      <h1 className="text-4xl font-black mb-2 tracking-tight">Apartment Setup</h1>
      <p className="text-text-secondary font-medium mb-12">Tell us where you live for door-step delivery</p>
      
      <div className="space-y-4 mb-12">
        <div className="relative">
          <select className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-black/5 font-bold text-sm appearance-none focus:outline-none focus:border-primary transition-colors">
            <option>Select Apartment Name</option>
            <option>Zynrova Nest Phase 1</option>
            <option>Zynrova Nest Phase 2</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
            <ChevronRight size={18} className="rotate-90" />
          </div>
        </div>
        
        <div className="flex gap-4">
          <select className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl border border-black/5 font-bold text-sm appearance-none focus:outline-none focus:border-primary transition-colors">
            <option>Block</option>
            <option>Block A</option>
            <option>Block B</option>
            <option>Block C</option>
          </select>
          <select className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl border border-black/5 font-bold text-sm appearance-none focus:outline-none focus:border-primary transition-colors">
            <option>Floor</option>
            {[1,2,3,4,5,6,7,8,9,10].map(f => <option key={f}>Floor {f}</option>)}
          </select>
        </div>
        
        <input 
          type="text" 
          placeholder="Door Number (e.g. 402)" 
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-black/5 font-bold text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
      >
        Confirm Address
      </button>
    </div>
  </div>
);
