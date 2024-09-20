// src/middlewares/authorize.js
const jwt = require('jsonwebtoken');

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token não fornecido.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Token inválido.' });
            }

            if (!allowedRoles.includes(decoded.userType)) {
                return res.status(403).json({ success: false, message: 'Acesso negado.' });
            }

            req.user = decoded;
            next();
        });
    };
};

module.exports = authorize;
