import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { authService } from '../services/api';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.data.token);
      // Redirigir a la página de usuario
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre de usuario" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingreso</button>
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrarme</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;