// src/App.js
import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Payment from './components/Payment';
import AboutContact from './components/AboutContact';
import Footer from './components/Footer';
import Bobbie from './assets/images/bobbiegoods.jpeg';


// Produtos
const products = [
  {
    id: 1,
    name: 'KIT Bobbies Goods 1',
    description: 'Livro para colorir.',
    price: 10.00,
    colors: ['preto'],
    sizes: [30, 60, 120],
    images: [Bobbie],
    featured: true,
    tipo: 'preto',
  },
  {
    id: 2,
    name: 'KIT Bobbies Goods 2',
    description: 'Livro para colorir.',
    price: 20.00,
    colors: ['branco'],
    sizes: [30, 60, 120],
    images: [Bobbie],
    featured: true,
    tipo: 'branco',
  },
  {
    id: 3,
    name: 'KIT Bobbies Goods 3',
    description: 'Livro para colorir.',
    price: 30.00,
    colors: ['vermelho'],
    sizes: [30, 60, 120],
    images: [Bobbie],
    featured: false,
    tipo: 'vermelho',
  },
  {
    id: 4,
    name: 'KIT Bobbies Goods 4',
    description: 'Livro para colorir.',
    price: 40.00,
    colors: ['azul'],
    sizes: [30, 60, 120],
    images: [Bobbie],
    featured: true,
    tipo: 'azul',
  },
  {
    id: 5,
    name: 'KIT Bobbies Goods 5',
    description: 'Livro para colorir.',
    price: 50.00,
    colors: ['verde'],
    sizes: [30, 60, 120],
    images: [Bobbie],
    featured: true,
    tipo: 'verde',
  }
];

function App() {
  const [section, setSection] = useState('home');
  const [currentProductId, setCurrentProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({ size: '', tipo: '', price: 500 });

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const navigate = to => setSection(to);

  const handleAddToCart = (productId, size) => {
    setCart(prev => {
      const exists = prev.find(i => i.productId === productId && i.size === size);
      if (exists) {
        return prev.map(i =>
          i === exists ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, size, quantity: 1 }];
    });
    setSection('cart');
  };

  return (
    <>
      <Header current={section} onNavigate={navigate} cartCount={cartCount} />

      <main>
        {section === 'home' && (
          <Home
            featuredProducts={products.filter(p => p.featured)}
            onProductClick={id => {
              setCurrentProductId(id);
              navigate('productDetail');
            }}
            onShopNow={() => navigate('catalog')}
          />
        )}

        {section === 'catalog' && (
          <Catalog
            products={products}
            filters={filters}
            onFilterChange={setFilters}
            onProductClick={id => {
              setCurrentProductId(id);
              navigate('productDetail');
            }}
          />
        )}

        {section === 'productDetail' && (
          <ProductDetail
            product={products.find(p => p.id === currentProductId)}
            onAddToCart={handleAddToCart}
            onClose={() => navigate('catalog')}
          />
        )}

        {section === 'cart' && (
          <Cart
            cart={cart}
            products={products}
            onCheckout={() => navigate('payment')}
          />
        )}

        {section === 'payment' && (
          <Payment
            onSuccess={() => {
              setCart([]);
              navigate('home');
            }}
          />
        )}

        {section === 'about' && <AboutContact />}
      </main>

      <Footer />
    </>
  );
}

export default App;
