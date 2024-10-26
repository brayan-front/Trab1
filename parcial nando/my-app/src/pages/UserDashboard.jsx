import React, { useState, useEffect } from 'react';
import { codeService } from '../services/api';

function UserDashboard() {
  const [code, setCode] = useState('');
  const [registeredCodes, setRegisteredCodes] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await codeService.createCode(code);
      // Actualizar la lista de códigos
      fetchCodes();
      setCode('');
    } catch (error) {
      setError('Error al registrar el código. Intenta nuevamente.');
      console.error('Error al registrar código:', error);
    }
  };

  const fetchCodes = async () => {
    try {
      const response = await codeService.getCodes();
      setRegisteredCodes(response.data);
    } catch (error) {
      console.error('Error al obtener códigos:', error);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Registrar Código</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingresa tu código"
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Salir</button>

      <h3>Códigos Registrados</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Código</th>
            <th>Premio</th>
          </tr>
        </thead>
        <tbody>
          {registeredCodes.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.code}</td>
              <td>{item.prize ? item.prize : 'No ganaste'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;