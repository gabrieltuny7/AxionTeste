// src/components/Catalog.js
import React, { useMemo } from 'react';

export default function Catalog({ products, filters, onFilterChange, onProductClick }) {
  const { size, tipo, price } = filters;

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      (size === '' || p.sizes.includes(Number(size))) &&
      (tipo === '' || p.tipo === tipo) &&
      p.price <= price
    );
  }, [products, size, tipo, price]);

  const formatPrice = value => `R$ ${value.toFixed(2).replace('.', ',')}`;

  const handleFilterChange = field => event => {
    const newValue = field === 'price' ? Number(event.target.value) : event.target.value;
    onFilterChange({ ...filters, [field]: newValue });
  };

  return (
    <section id="catalog" aria-label="Catálogo de produtos">
      <h3>Catálogo</h3>
      <div className="filters" role="form" aria-labelledby="catalogFiltersLabel">
        {/* <div className="filter-group">
          <label htmlFor="filter-size">Tamanho:</label>
          <select
            id="filter-size"
            value={size}
            onChange={handleFilterChange('size')}
            aria-controls="catalog-products"
          >
            <option value="">Todos</option>
            {[36, 38, 40, 42, 44].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div> */}

        <div className="filter-group">
          <label htmlFor="filter-tipo">Tipo:</label>
          <select
            id="filter-tipo"
            value={tipo}
            onChange={handleFilterChange('tipo')}
            aria-controls="catalog-products"
          >
            <option value="">Todas</option>
            {['preto', 'branco', 'vermelho', 'azul', 'verde'].map(c => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-price">Preço máximo:</label>
          <input
            type="range"
            id="filter-price"
            min="0"
            max="500"
            step="10"
            value={price}
            onChange={handleFilterChange('price')}
            aria-valuemin="0"
            aria-valuemax="500"
            aria-valuenow={price}
            aria-controls="catalog-products"
          />
          <span id="price-value">{formatPrice(price)}</span>
        </div>
      </div>

      <div id="catalog-products" className="products-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>
            Nenhum produto encontrado com esses filtros.
          </p>
        ) : (
          filteredProducts.map(product => (
            <article
              key={product.id}
              className="product-card"
              tabIndex="0"
              role="button"
              aria-label={`${product.name}, preço ${formatPrice(product.price)}. Ver detalhes.`}
              onClick={() => onProductClick(product.id)}
              onKeyPress={e => ['Enter', ' '].includes(e.key) && onProductClick(product.id)}
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
          ))
        )}
      </div>
    </section>
  );
}

