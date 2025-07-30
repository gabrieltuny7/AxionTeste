import React, { useState } from 'react';

export default function ProductDetail({ product, onAddToCart, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(product ? product.images[0] : '');

  if (!product) return null;

  const formatPrice = p => `R$ ${p.toFixed(2).replace('.', ',')}`;

  return (
    <section
      id="product-detail"
      role="region"
      aria-live="polite"
      aria-hidden={!product}
    >
      <button
        className="close-detail"
        aria-label="Fechar detalhe do produto"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="images">
        <img
          src={mainImage}
          alt={`Imagem principal de ${product.name}`}
          className="main-img"
        />
        <div className="thumbs">
          {product.images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Imagem ${idx + 1} de ${product.name}`}
              className={url === mainImage ? 'selected' : ''}
              onClick={() => setMainImage(url)}
              tabIndex="0"
              onKeyPress={e =>
                ['Enter', ' '].includes(e.key) && setMainImage(url)
              }
            />
          ))}
        </div>
      </div>

      <div className="info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>

        <div className="sizes" role="radiogroup" aria-label="Selecione um tamanho">
          {product.sizes.map(sz => (
            <label key={sz} htmlFor={`size-${sz}`}>
              <input
                type="radio"
                name="size"
                id={`size-${sz}`}
                value={sz}
                checked={selectedSize === sz}
                onChange={() => setSelectedSize(sz)}
              />
              <span>{sz}</span>
            </label>
          ))}
        </div>

        <button
          className="buy-btn"
          disabled={!selectedSize}
          aria-disabled={!selectedSize}
          onClick={() => {
            onAddToCart(product.id, selectedSize);
            setSelectedSize(null);
          }}
        >
          {selectedSize
            ? `Adicionar ao carrinho (Tamanho ${selectedSize})`
            : 'Selecione um tamanho'}
        </button>

        <div className="price">{formatPrice(product.price)}</div>
      </div>
    </section>
  );
}
