import React from "react";
import "./Spinner.css"; // Importa il CSS per lo spinner

function Spinner() {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
}

export default Spinner;
