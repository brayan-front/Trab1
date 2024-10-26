const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin, isUser } = require('../middleware/roleMiddleware');

// Rutas para usuarios normales
router.post('/', authMiddleware, isUser, codeController.createCode);
router.get('/my-codes', authMiddleware, isUser, codeController.getCodes);
router.post('/redeem/:prizeId', authMiddleware, isUser, codeController.redeemPrize);

// Rutas para administradores
router.get('/winners', authMiddleware, isAdmin, codeController.getWinners);

module.exports = router;