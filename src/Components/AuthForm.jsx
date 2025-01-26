import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Importa il client Supabase
import { useNavigate } from "react-router-dom"; // Importa useNavigate per il reindirizzamento
import "./AuthForm.css"; // Importa il CSS per il form

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Stato per gestire il login o la registrazione
  const [error, setError] = useState(null); // Stato per gestire gli errori
  const [user, setUser] = useState(null); // Stato per memorizzare l'utente
  const navigate = useNavigate(); // Hook per il reindirizzamento

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setUser(session ? session.user : null);
      }
    };

    fetchSession();

    // Abilita il listener per i cambiamenti di stato dell'autenticazione
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null);
    });

    // Cleanup della subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home"); // Reindirizza alla pagina Home se l'utente è loggato
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetta l'errore

    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      }
    } else {
      // Registrazione
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login" : "Registrazione"}</h2>
      {error && <p className="error">{error}</p>}
      {user ? (
        <p>Sei loggato come: {user.email}</p> // Mostra l'email dell'utente loggato
      ) : (
        <p>Non sei loggato.</p> // Messaggio per utenti non loggati
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Accedi" : "Registrati"}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Passa alla registrazione" : "Hai già un account? Accedi"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
