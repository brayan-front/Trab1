import React, { useState } from 'react';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        cedula: '',
        email: '',
        phone: '',
        city: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="register-container">
            <h2>Registros</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="birthDate">Fecha de Nacimiento</label>
                <input 
                    type="date" 
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="cedula">Cédula</label>
                <input 
                    type="text" 
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Correo </label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Teléfono</label>
                <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="city">Ciudad</label>
                <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <div className="buttons-container">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default Register;