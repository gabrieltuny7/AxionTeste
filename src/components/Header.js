import React from 'react';

export default function Header({ current, onNavigate, cartCount }) {
  return (
    <header>
      <h1
        id="logo"
        tabIndex="0"
        role="button"
        aria-label="Ir para página inicial"
        onClick={() => onNavigate('home')}
        onKeyPress={e => ['Enter', ' '].includes(e.key) && onNavigate('home')}
      >
        AXION
      </h1>
      <nav aria-label="Navegação do site">
        <button
          className={`nav-link ${current === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
          aria-current={current === 'home' ? 'page' : undefined}
        >
          Início
        </button>
        <button
          className={`nav-link ${current === 'catalog' ? 'active' : ''}`}
          onClick={() => onNavigate('catalog')}
        >
          Catálogo
        </button>
        <button
          className={`nav-link ${current === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
          aria-label="Ver carrinho de compras"
        >
          Carrinho 🛒 (<span>{cartCount}</span>)
        </button>
        <button
          className={`nav-link ${current === 'about' ? 'active' : ''}`}
          onClick={() => onNavigate('about')}
        >
          Sobre Nós
        </button>
      </nav>
    </header>
  );
}
