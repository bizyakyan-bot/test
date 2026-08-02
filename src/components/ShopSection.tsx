import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ShoppingCart, Check, X, Tag, SlidersHorizontal, ArrowRight, Truck, ShieldCheck, RefreshCw, Heart, Plus, Minus, Info } from 'lucide-react';
import { shopProducts, ShopProduct, SAMPLE_INITIAL_SHOP_ORDERS } from '../data';
import { ShopOrder } from '../types';
import { saveShopOrderToFirebase } from '../lib/firebaseService';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollEffects';


export interface CartItem {
  product: ShopProduct;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export const ShopSection = ({ 
  onOpenProductDetail, 
  onAddToCart,
  cartItemsCount,
  onOpenCart
}: { 
  onOpenProductDetail: (product: ShopProduct) => void;
  onAddToCart: (product: ShopProduct, color: string, size: string, qty: number) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 't-shirts' | 'caps'>('all');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredProducts = shopProducts.filter(product => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: ShopProduct) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    onAddToCart(product, defaultColor, defaultSize, 1);

    setAddedToast(`Added to cart: ${product.name}`);
    setTimeout(() => {
      setAddedToast(null);
    }, 3000);
  };

  return (
    <section id="shop" className="py-28 px-4 md:px-16 bg-gradient-to-b from-[#061011] via-[#081719] to-[#050d0e] relative border-t border-emerald-500/10 text-white overflow-hidden">
      {/* Decorative ambient lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Toast Notification when items added */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            key="added-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[120] bg-emerald-500 text-slate-950 font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-emerald-300/40"
          >
            <div className="bg-slate-950/20 p-2 rounded-full">
              <Check size={18} className="text-slate-950" />
            </div>
            <span className="text-sm font-semibold">{addedToast}</span>
            <button 
              onClick={onOpenCart}
              className="ml-2 underline text-xs uppercase tracking-wider hover:opacity-80"
            >
              View Cart ({cartItemsCount})
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold tracking-widest text-xs uppercase rounded-full flex items-center gap-1.5">
                <Tag size={12} /> J.Bizjak Official Store
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Soča Valley Gear</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
              Soca Valley <span className="text-emerald-400 glow-text-emerald">Apparel & Caps</span>
            </h2>
            <p className="text-slate-300 max-w-2xl text-base md:text-lg font-light leading-relaxed">
              Premium t-shirts and caps featuring official J.Bizjak & Soča Valley artwork. Carry memories of alpine peaks and the emerald Soča River with you.
            </p>
          </div>

          {/* Cart trigger button */}
          <button
            onClick={onOpenCart}
            className="relative self-start md:self-auto flex items-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 px-6 py-3.5 rounded-2xl transition-all duration-300 group shadow-lg"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm tracking-wider uppercase">Cart</span>
            {cartItemsCount > 0 && (
              <span className="bg-emerald-400 text-slate-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal delay={0.05} className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1.5 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              All ({shopProducts.length})
            </button>
            <button
              onClick={() => setActiveCategory('t-shirts')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === 't-shirts'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              T-Shirts ({shopProducts.filter(p => p.category === 't-shirts').length})
            </button>
            <button
              onClick={() => setActiveCategory('caps')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                activeCategory === 'caps'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Caps ({shopProducts.filter(p => p.category === 'caps').length})
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <Truck size={14} className="text-emerald-400" /> Worldwide Delivery & Free Local Pickup in Bovec
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" /> 100% Organic Cotton & Premium Quality
            </span>
          </div>
        </ScrollReveal>

        {/* Products Grid with Stagger */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <div
                onClick={() => onOpenProductDetail(product)}
                className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between cursor-pointer hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] relative h-full"
              >
              <div>
                {/* Product Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/60">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.isBestseller && (
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        New
                      </span>
                    )}
                  </div>

                  {/* J.Bizjak Stamp Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-md">
                    <img src="/IMG_9899.png" alt="J.Bizjak Logo" className="w-6 h-6 object-contain" />
                  </div>

                  {/* Quick view hover button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <span className="bg-white/90 text-slate-950 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <Info size={14} /> Quick View
                    </span>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {product.category === 't-shirts' ? 'T-Shirt' : 'Cap'}
                    </span>
                    <span className="text-xl font-extrabold text-white">
                      €{product.price.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>

                  {/* Color Swatches preview & Sizes */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 mr-1">Colors:</span>
                      {product.colors.map((c, idx) => (
                        <span
                          key={idx}
                          title={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-white/30 inline-block shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300 font-semibold">
                      {product.sizes.slice(0, 3).join(', ')}
                      {product.sizes.length > 3 && '+'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Footer Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="w-full bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
                >
                  <ShoppingCart size={15} className="group-hover/btn:scale-110 transition-transform" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Info Banner below grid */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-teal-950/30">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center flex-shrink-0">
              <img src="/IMG_9899.png" alt="J.Bizjak Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">Pickup During Your Stay in Bovec</h4>
              <p className="text-slate-300 text-sm font-light">
                Collect your gear directly at the apartment in Bovec or choose postal delivery straight to your doorstep.
              </p>
            </div>
          </div>
          <button 
            onClick={onOpenCart}
            className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105"
          >
            View Cart ({cartItemsCount})
          </button>
        </div>
      </div>
    </section>
  );
};

export const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}: {
  product: ShopProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ShopProduct, color: string, size: string, qty: number) => void;
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Sync defaults when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="product-detail-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            key="product-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl glass-panel-heavy border border-white/10 rounded-3xl shadow-3xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row text-white z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white hover:text-emerald-400 transition-colors z-20 border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Left: Image gallery */}
            <div className="md:w-1/2 p-6 bg-slate-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                  <img src="/IMG_9899.png" alt="Logo" className="w-5 h-5 object-contain" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">J.Bizjak Official</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === img ? 'border-emerald-400 scale-105 shadow-lg' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product specs and options */}
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {product.category === 't-shirts' ? 'T-Shirt' : 'Cap'}
                    </span>
                    <span className="text-xs text-slate-400">SKU: {product.id}</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-black text-emerald-400 mt-2">
                    €{product.price.toFixed(2)}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex justify-between">
                    <span>Select Color:</span>
                    <span className="text-emerald-400 font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedColor === color.name
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/40"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex justify-between">
                    <span>Select Size:</span>
                    <span className="text-emerald-400 font-semibold">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-105'
                            : 'bg-white/5 border-white/10 text-slate-200 hover:border-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Product Highlights:</h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check size={12} className="text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity and Submit */}
              <div className="space-y-4 pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase text-slate-300">Quantity:</span>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 font-mono font-bold text-sm text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 ml-auto font-semibold">
                    Subtotal: <strong className="text-white">€{(product.price * quantity).toFixed(2)}</strong>
                  </span>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                    addedSuccess
                      ? 'bg-emerald-400 text-slate-950 scale-105'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-[1.02]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Add to Cart (€{(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CartModal = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'bovec-pickup', // 'bovec-pickup' | 'postal-delivery'
    notes: ''
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new order record for owner portal
    const newOrder: ShopOrder = {
      id: 'shop-order-' + Date.now(),
      orderRef: 'SO-' + Math.floor(1000 + Math.random() * 9000),
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryMethod: formData.deliveryMethod as any,
      shippingAddress: formData.deliveryMethod === 'postal-delivery' ? formData.address : undefined,
      notes: formData.notes,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        unitPrice: item.product.price,
        image: item.product.images[0]
      })),
      totalAmount: totalAmount + (formData.deliveryMethod === 'postal-delivery' ? 3.9 : 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    saveShopOrderToFirebase(newOrder);

    try {
      const saved = localStorage.getItem('ebike_shop_orders');
      const existing: ShopOrder[] = saved ? JSON.parse(saved) : SAMPLE_INITIAL_SHOP_ORDERS;
      localStorage.setItem('ebike_shop_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('Failed to save shop order:', err);
    }

    setCheckoutStep('success');
  };


  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            key="cart-modal-card"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="relative w-full max-w-2xl glass-panel-heavy border border-white/10 rounded-3xl shadow-3xl overflow-hidden max-h-[90vh] flex flex-col text-white z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">
                    {checkoutStep === 'cart' && 'Your Cart'}
                    {checkoutStep === 'form' && 'Checkout / Order'}
                    {checkoutStep === 'success' && 'Order Received'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    J.Bizjak Official Soča Valley Gear
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <ShoppingBag size={32} />
                      </div>
                      <p className="text-slate-300 font-medium text-lg">Your cart is empty.</p>
                      <p className="text-slate-400 text-xs max-w-xs mx-auto">
                        Explore our t-shirts and caps catalog and add items to your cart.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-2 bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all"
                      >
                        Back to Shop
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xl border border-white/10 flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-white truncate">{item.product.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>Color: <strong className="text-slate-200">{item.selectedColor}</strong></span>
                              <span>•</span>
                              <span>Size: <strong className="text-slate-200">{item.selectedSize}</strong></span>
                            </div>
                            <div className="text-sm font-bold text-emerald-400 mt-1">
                              €{(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1">
                            <button
                              onClick={() => onUpdateQty(idx, -1)}
                              className="p-1 hover:bg-white/10 rounded text-slate-300"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(idx, 1)}
                              className="p-1 hover:bg-white/10 rounded text-slate-300"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                            title="Remove"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'form' && (
                <form id="order-form" onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
                    <Info size={20} className="flex-shrink-0" />
                    <span>
                      Your request will be submitted for local pickup in Bovec or mail delivery. You will receive an email confirmation with full details.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+386 40 123 456"
                        className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Fulfillment Method
                      </label>
                      <select
                        value={formData.deliveryMethod}
                        onChange={e => setFormData({ ...formData, deliveryMethod: e.target.value })}
                        className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="bovec-pickup">Local Pickup in Bovec / Čezsoča (Free)</option>
                        <option value="postal-delivery">Postal Mail Delivery (+€3.90)</option>
                      </select>
                    </div>
                  </div>

                  {formData.deliveryMethod === 'postal-delivery' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Shipping Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street, House Number, Postal Code & City, Country"
                        className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Notes or Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific requests regarding your stay or pickup..."
                      className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="py-8 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check size={40} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">Thank You for Your Order!</h4>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Your order request for official J.Bizjak apparel has been submitted successfully.
                    </p>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2 font-bold text-white">
                      <span>Customer:</span>
                      <span>{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Email:</span>
                      <span className="text-emerald-400 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span>Fulfillment:</span>
                      <span>{formData.deliveryMethod === 'bovec-pickup' ? 'Local Pickup in Bovec' : 'Postal Delivery'}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-sm text-white pt-1">
                      <span>Grand Total:</span>
                      <span className="text-emerald-400">€{(totalAmount + (formData.deliveryMethod === 'postal-delivery' ? 3.9 : 0)).toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    A confirmation email and instructions have been sent to <strong className="text-slate-200">{formData.email}</strong>.
                  </p>

                  <button
                    onClick={handleFinish}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg"
                  >
                    Done
                  </button>

                </div>
              )}
            </div>

            {/* Modal Footer */}
            {checkoutStep !== 'success' && (
              <div className="p-6 border-t border-white/10 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Total:</span>
                  <span className="text-2xl font-black text-emerald-400">€{totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {checkoutStep === 'form' && (
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 hover:bg-white/5"
                    >
                      Back to Cart
                    </button>
                  )}

                  {checkoutStep === 'cart' && cart.length > 0 && (
                    <button
                      onClick={() => setCheckoutStep('form')}
                      className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={16} />
                    </button>
                  )}

                  {checkoutStep === 'form' && (
                    <button
                      type="submit"
                      form="order-form"
                      className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Place Order</span>
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
