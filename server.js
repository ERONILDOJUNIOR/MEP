// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');

const userRoutes = require('./src/routes/userRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const productRoutes = require('./src/routes/productRoutes');
const storeCustomizationRoutes = require('./src/routes/storeCustomizationRoutes');


dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Roteamento para as páginas específicas
app.get('/admin-home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-home.html'));
});

app.get('/vendedor-home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/vendedor-home.html'));
});

// Conecta ao banco de dados e sincroniza os modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao PostgreSQL');
        return sequelize.sync(); // Sincroniza todos os modelos
    })
    .then(() => {
        console.log('Modelos sincronizados');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

app.use(userRoutes);
app.use(storeRoutes);
app.use(productRoutes);
app.use(storeCustomizationRoutes);

// Rota para o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
