// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para criar um novo usuário
router.post('/users', userController.createUser);

// Rota para obter todos os usuários
router.get('/users', userController.getAllUsers);

// Rota para obter um usuário por ID
router.get('/users/:id', userController.getUserById);

// Rota para atualizar um usuário
router.put('/users/:id', userController.updateUser);

// Rota para excluir um usuário
router.delete('/users/:id', userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;
