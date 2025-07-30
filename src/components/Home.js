import React from 'react';

export default function Home({ featuredProducts, onProductClick, onShopNow }) {
  const formatPrice = p => `R$ ${p.toFixed(2).replace('.', ',')}`;

  return (
    <section id="home" aria-label="Página inicial">
      <div id="home-banner" role="banner" aria-live="polite">
        <div className="banner-text">
          <h2>Bem-vindos</h2>
          <p>Confira nossas coleções exclusivas de  Bobbies Goods!</p>
          <button
            id="shop-now-btn"
            aria-label="Ir para catálogo de produtos"
            onClick={onShopNow}
          >
            Comprar agora
          </button>
        </div>
      </div>
      <section id="featured-products" aria-label="Produtos em destaque">
        <h3>Produtos em destaque</h3>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <article
              key={product.id}
              className="product-card"
              tabIndex="0"
              role="button"
              aria-label={`${product.name}, preço ${formatPrice(product.price)}. Ver detalhes.`}
              onClick={() => onProductClick(product.id)}
              onKeyPress={e =>
                ['Enter', ' '].includes(e.key) && onProductClick(product.id)
              }
            >
              <img src={product.images[0]} alt={`Imagem de ${product.name}`} />
              <h4>{product.name}</h4>
              <p>
                {product.description.length > 60
                  ? product.description.slice(0, 57) + '...'
                  : product.description}
              </p>
              <div className="price">{formatPrice(product.price)}</div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
