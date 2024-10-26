const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const codeRoutes = require('./routes/codes');
const app = express();

dotenv.config();

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/codes', codeRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});