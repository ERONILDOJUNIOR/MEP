// src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Criar um novo usuário
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        // Hash a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, userType });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

// Obter um usuário por ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter usuário' });
    }
};

// Atualizar um usuário
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, userType } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.name = name;
            user.email = email;

            // Atualize a senha somente se uma nova senha for fornecida
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            user.userType = userType;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'E-mail ou senha inválidos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'E-mail ou senha inválidos.' });
        }

        // Gerar um token JWT com o tipo de usuário
        const token = jwt.sign({ id: user.id, email: user.email, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao fazer login.' });
    }
};
