import React, { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
    const [winners, setWinners] = useState([]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };
  
    return (
        <div className="admin-dashboard">
            <h2> Administración</h2>
            <button className="logout-button" onClick={handleLogout}>Salir</button>
            
            <div className="winners-section">
                <h3> Ganadores</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Celular</th>
                                <th>Código</th>
                                <th>Premio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {winners.map((winner) => (
                                <tr key={winner.id}>
                                    <td>{winner.date}</td>
                                    <td>{winner.name}</td>
                                    <td>{winner.cedula}</td>
                                    <td>{winner.phone}</td>
                                    <td>{winner.code}</td>
                                    <td>{winner.prize}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;