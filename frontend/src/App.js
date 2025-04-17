import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Páginas de autenticación
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

// Servicio de autenticación
import authService from './services/authService';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Ruta principal protegida */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          {/* Redirigir a login si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
