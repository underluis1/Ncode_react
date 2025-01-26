import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Importa il client Supabase

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato per gestire l'autenticazione

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setIsAuthenticated(!!session); // Imposta l'autenticazione in base alla sessione
      }
      setLoading(false); // Imposta il caricamento a false
    };

    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Mostra un messaggio di caricamento mentre controlli la sessione
  }

  // Se non c'è una sessione, reindirizza alla pagina di autenticazione
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children; // Se l'utente è autenticato, mostra i figli
};

export default ProtectedRoute;
