const express = require('express');
const router = express.Router();

const db = require('../config/database');

// Consultar todos os sentimentos
router.get('/', async (req, res) => {
    try {
        const [sentimentos] = await db.query(
            'SELECT * FROM sentimentos ORDER BY nome'
        );

        res.json(sentimentos);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao consultar sentimentos.'
        });
    }
});

// Cadastrar um novo sentimento
router.post('/', async (req, res) => {
    try {
        const { nome, descricao, orientacoes } = req.body;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            'INSERT INTO sentimentos (nome, descricao, orientacoes) VALUES (?, ?, ?)',
            [nome, descricao, orientacoes || null]
        );

        res.status(201).json({
            mensagem: 'Sentimento cadastrado com sucesso!',
            id: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar sentimento.'
        });
    }
});

module.exports = router;