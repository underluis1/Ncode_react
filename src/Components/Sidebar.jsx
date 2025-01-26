import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Sidebar.css";

function Sidebar({ onAddProduct }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("Logout effettuato con successo");
      navigate("/auth");
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profilo</Link>
          </li>
        </ul>

        <button className="bottone" onClick={handleLogout}>
          Esci
        </button>
      </nav>
    </>
  );
}

export default Sidebar;
