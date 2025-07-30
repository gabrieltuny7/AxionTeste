// src/components/Cart.js
import React from 'react';

export default function Cart({ cart, products, onCheckout }) {
  const formatPrice = value => `R$ ${value.toFixed(2).replace('.', ',')}`;

  // Mescla informações do carrinho com os produtos
  const items = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <section
      id="cart"
      className='active'
      role="region"
      aria-live="polite"
      aria-label="Seu carrinho de compras"
    >
      <h3>Seu Carrinho</h3>
      <div className="cart-items">
        {items.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Seu carrinho está vazio.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-info">
                <img
                  src={item.product.images[0]}
                  alt={`Imagem de ${item.product.name}`}
                />
                <div className="details">
                  <strong>{item.product.name}</strong>
                  <small>Tamanho: {item.size}</small>
                  <small>Quantidade: {item.quantity}</small>
                </div>
              </div>
              <div className="price">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary" aria-live="polite" aria-atomic="true">
        <span>Total:</span> <span id="cart-total">{formatPrice(total)}</span>
      </div>
      <button
        className="checkout-btn"
        disabled={items.length === 0}
        aria-disabled={items.length === 0}
        onClick={onCheckout}
      >
        Finalizar Compra
      </button>
    </section>
  );
}
