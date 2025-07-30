import React from 'react';

export default function Payment({ onSuccess }) {
  const handleSubmit = e => {
    e.preventDefault();
    alert('Pagamento realizado com sucesso! Obrigado pela sua compra.');
    onSuccess();
  };

  return (
    <section
      id="payment"
      role="region"
      aria-live="polite"
      aria-label="Página de pagamento"
    >
      <h3>Pagamento</h3>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome completo</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="address">Endereço</label>
        <textarea id="address" name="address" rows="3" required />

        <label htmlFor="card">Número do cartão</label>
        <input
          type="text"
          id="card"
          name="card"
          maxLength="16"
          pattern="\d{16}"
          placeholder="1234 5678 9012 3456"
          required
          inputMode="numeric"
        />

        <label htmlFor="expiry">Validade (mês/ano)</label>
        <input type="month" id="expiry" name="expiry" required />

        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          maxLength="4"
          pattern="\d{3,4}"
          required
          inputMode="numeric"
        />

        <button type="submit">Finalizar Compra</button>
      </form>
    </section>
  );
}
