
const db = require('../config/database');

async function listar(req, res) {
    try {
        const [sentimentos] = await db.query(
            'SELECT * FROM sentimentos ORDER BY nome'
        );
        res.json(sentimentos);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao consultar sentimentos.' });
    }
}

async function cadastrar(req, res) {
    try {
        const { nome, descricao, orientacoes } = req.body;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO sentimentos (nome, descricao, orientacoes)
             VALUES (?, ?, ?)`,
            [nome, descricao, orientacoes || null]
        );

        res.status(201).json({
            mensagem: 'Sentimento cadastrado com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar sentimento.' });
    }
}

async function editar(req, res) {
    try {
        const { nome, descricao, orientacoes } = req.body;
        const { id } = req.params;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `UPDATE sentimentos
             SET nome = ?, descricao = ?, orientacoes = ?
             WHERE id = ?`,
            [nome, descricao, orientacoes || null, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Sentimento não encontrado.' });
        }

        res.json({ mensagem: 'Sentimento atualizado com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao editar sentimento.' });
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM sentimentos WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Sentimento não encontrado.' });
        }

        res.json({ mensagem: 'Sentimento excluído com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao excluir sentimento.' });
    }
}

module.exports = { listar, cadastrar, editar, excluir };
