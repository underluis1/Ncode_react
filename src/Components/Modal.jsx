import React, { useState, useEffect } from "react";
import "./Modal.css"; // Importa il CSS per il modal

function Modal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    } else {
      setName("");
      setPrice("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price });
    onClose(); // Chiudi il modal dopo l'invio
  };

  if (!isOpen) return null; // Non renderizzare nulla se il modal non è aperto

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialData ? "Modifica Prodotto" : "Aggiungi Prodotto"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Prezzo:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit">Salva</button>
          <button type="button" onClick={onClose}>
            Annulla
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
