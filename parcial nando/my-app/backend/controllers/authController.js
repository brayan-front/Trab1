const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { 
            username, 
            password,
            name,
            birthDate,
            cedula,
            phone,
            city 
        } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { cedula }] });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'El usuario o cédula ya está registrado' 
            });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const user = new User({
            username,
            password: hashedPassword,
            name,
            birthDate,
            cedula,
            phone,
            city,
            role: 'user' // Por defecto es usuario normal
        });

        await user.save();
        res.status(201).json({ 
            message: 'Usuario creado exitosamente',
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al registrar usuario', 
            error: error.message 
        });
    }
};

// Registro de administrador
exports.registerAdmin = async (req, res) => {
    try {
        const { 
            username, 
            password,
            name,
            birthDate,
            cedula,
            phone,
            city 
        } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { cedula }] });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'El usuario o cédula ya está registrado' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            username,
            password: hashedPassword,
            name,
            birthDate,
            cedula,
            phone,
            city,
            role: 'admin'
        });

        await admin.save();
        res.status(201).json({ 
            message: 'Administrador creado exitosamente',
            user: {
                id: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al registrar administrador', 
            error: error.message 
        });
    }
};

// Autenticación de usuario
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: user._id,
                username: user.username,
                role: user.role 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login exitoso',
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al iniciar sesión', 
            error: error.message 
        });
    }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener perfil', 
            error: error.message 
        });
    }
};

// Actualizar perfil de usuario
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, city } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar campos permitidos
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (city) user.city = city;

        await user.save();
        res.json({ 
            message: 'Perfil actualizado exitosamente',
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar perfil', 
            error: error.message 
        });
    }
};