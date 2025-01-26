import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Importa il client Supabase
import Spinner from "../Components/Spinner"; // Importa il componente Spinner
import Modal from "../Components/Modal"; // Importa il componente Modal
import "./Page.css";

function Home() {
  const [products, setProducts] = useState([]); // Stato per memorizzare i prodotti
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const [searchTerm, setSearchTerm] = useState(""); // Stato per il termine di ricerca
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire l'apertura del modal
  const [currentProduct, setCurrentProduct] = useState(null); // Stato per il prodotto corrente

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product") // Nome della tabella
        .select("*") // Seleziona tutti i campi
        .order("created_at", { ascending: false }); // Ordina per created_at dal più recente al più vecchio

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data); // Imposta i prodotti nello stato
      }
      setLoading(false); // Imposta il caricamento a false
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSubmit = async (data) => {
    if (currentProduct) {
      // Modifica prodotto
      const { error } = await supabase
        .from("product")
        .update(data)
        .eq("id", currentProduct.id);
      if (error) console.error("Error updating product:", error);
    } else {
      // Aggiungi nuovo prodotto
      const { error } = await supabase.from("product").insert([data]);
      if (error) console.error("Error adding product:", error);
    }
    handleCloseModal();
    // Ricarica i prodotti dopo l'inserimento/modifica
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (error) console.error("Error deleting product:", error);
    // Ricarica i prodotti dopo l'eliminazione
    fetchProducts();
  };

  if (loading) {
    return <Spinner />; // Mostra lo spinner durante il caricamento
  }

  // Filtra i prodotti in base al termine di ricerca
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Benvenuto nella Home</h1>
      <h2>Prodotti</h2>
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Aggiorna il termine di ricerca
      />
      <button onClick={() => handleOpenModal()}>Aggiungi Prodotto</button>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <div className="testing">
              <p>
                {product.name}, prezzo= €{product.price}
              </p>
              <div>
                <button onClick={() => handleOpenModal(product)}>
                  Modifica
                </button>
                <button onClick={() => handleDelete(product.id)}>
                  Elimina
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={currentProduct}
      />
    </div>
  );
}

export default Home;
