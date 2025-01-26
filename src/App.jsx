import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Auth from "./Pages/Auth";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* Redirect dalla root "/" a "/home" */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/auth" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
