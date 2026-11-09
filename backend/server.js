const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./src/config/database');

const sentimentosRoutes = require('./src/routes/sentimentos');

const transtornosRoutes = require('./src/routes/transtornos');

const localidadesRoutes = require('./src/routes/localidades');

const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sentimentos', sentimentosRoutes);

app.use('/transtornos', transtornosRoutes);

app.use('/localidades', localidadesRoutes);

app.use('/auth', authRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do MHI funcionando!'
    });
});

// Inicialização do servidor
async function iniciarServidor() {
    try {
        await db.query('SELECT 1');

        console.log('Conexão com MySQL estabelecida!');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (erro) {
        console.error('Erro completo:', erro);
    }
}

iniciarServidor();