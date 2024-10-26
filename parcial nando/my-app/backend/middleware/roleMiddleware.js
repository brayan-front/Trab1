const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
    }
};

const isUser = (req, res, next) => {
    if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado.' });
    }
};

module.exports = { isAdmin, isUser };