const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    prizeAmount: { type: Number, required: true },
    isRedeemed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    redeemedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Prize', prizeSchema);