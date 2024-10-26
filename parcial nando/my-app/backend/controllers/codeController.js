const Code = require('../models/Code');
const Prize = require('../models/prize');
const User = require('../models/User');

// Función auxiliar para determinar premio aleatorio
const determinePrize = () => {
    const random = Math.random() * 100;
    if (random <= 0.1) return 1000000; // 0.1% probabilidad de ganar 1,000,000
    if (random <= 1) return 50000;     // 0.9% probabilidad de ganar 50,000
    if (random <= 10) return 10000;    // 9% probabilidad de ganar 10,000
    return 0;                          // 90% no gana
};

// Crear un nuevo código
exports.createCode = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user.id;

        // Verificar si el código ya existe
        const existingCode = await Code.findOne({ code });
        if (existingCode) {
            return res.status(400).json({ message: 'Este código ya ha sido registrado' });
        }

        // Determinar si es ganador y crear el premio
        const prizeAmount = determinePrize();
        const newCode = new Code({ 
            code,
            userId,
            prizeAmount,
            isWinner: prizeAmount > 0
        });
        await newCode.save();

        if (prizeAmount > 0) {
            const prize = new Prize({
                code,
                prizeAmount,
                userId
            });
            await prize.save();
        }

        res.status(201).json({
            code: newCode,
            message: prizeAmount > 0 ? `¡Felicitaciones! Ganaste $${prizeAmount}` : 'No ganaste esta vez'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el código', error: error.message });
    }
};

// Obtener códigos del usuario
exports.getCodes = async (req, res) => {
    try {
        const userId = req.user.id;
        const codes = await Code.find({ userId }).sort({ createdAt: -1 });
        res.json(codes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los códigos' });
    }
};

// Obtener ganadores (solo admin)
exports.getWinners = async (req, res) => {
    try {
        const winners = await Prize.find({ isRedeemed: true })
            .populate('userId', 'name cedula phone city')
            .sort({ redeemedAt: -1 });
        res.json(winners);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de ganadores' });
    }
};

// Redimir premio
exports.redeemPrize = async (req, res) => {
    try {
        const { prizeId } = req.params;
        const userId = req.user.id;

        const prize = await Prize.findOne({ _id: prizeId, userId, isRedeemed: false });
        if (!prize) {
            return res.status(404).json({ message: 'Premio no encontrado o ya redimido' });
        }

        prize.isRedeemed = true;
        prize.redeemedAt = new Date();
        await prize.save();

        res.json({ message: 'Premio redimido exitosamente', prize });
    } catch (error) {
        res.status(500).json({ message: 'Error al redimir el premio' });
    }
};