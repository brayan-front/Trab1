const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    cedula: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);