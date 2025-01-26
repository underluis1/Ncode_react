import React from "react";
import AuthForm from "../Components/AuthForm"; // Importa il componente AuthForm
import "./Page.css"; // Importa il CSS

function Auth() {
  return (
    <div className="page">
      {" "}
      {/* Applica la classe page */}
      <h1>Pagina di Autenticazione</h1>
      <AuthForm /> {/* Aggiungi il componente AuthForm */}
    </div>
  );
}

export default Auth;
