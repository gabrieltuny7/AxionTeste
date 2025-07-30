import React from 'react';

export default function AboutContact() {
  const handleSubmit = e => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    e.target.reset();
  };

  return (
    <section
      id="about-contact"
      aria-label="Sobre nós e contato"
      role="region"
    >
      <div className="about">
        <h3>Sobre Nós</h3>
        <p>
          A Axion é dedicada a oferecer produtos de qualidade, reunindo
          itens exclusivos e feitos para quem valoriza estilo e bom gosto.
          Nossa missão é trazer produtos que tornam seu dia a dia melhor.
        </p>
      </div>
      <div className="contact">
        <h3>Contato</h3>
        <form id="contact-form" onSubmit={handleSubmit} aria-label="Formulário de contato">
          <label htmlFor="contact-name">Nome</label>
          <input
            type="text"
            id="contact-name"
            name="contact-name"
            required
          />

          <label htmlFor="contact-email">E-mail</label>
          <input
            type="email"
            id="contact-email"
            name="contact-email"
            required
          />

          <label htmlFor="contact-message">Mensagem</label>
          <textarea
            id="contact-message"
            name="contact-message"
            rows="4"
            required
          />

          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
}
