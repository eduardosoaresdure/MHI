
const db = require('../config/database');

async function listar(req, res) {
    try {
        const [transtornos] = await db.query(
            'SELECT * FROM transtornos ORDER BY nome'
        );
        res.json(transtornos);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao consultar transtornos.' });
    }
}

async function cadastrar(req, res) {
    try {
        const { nome, descricao, sintomas, informacoes_adicionais } = req.body;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO transtornos
            (nome, descricao, sintomas, informacoes_adicionais)
            VALUES (?, ?, ?, ?)`,
            [nome, descricao, sintomas || null, informacoes_adicionais || null]
        );

        res.status(201).json({
            mensagem: 'Transtorno cadastrado com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar transtorno.' });
    }
}

async function editar(req, res) {
    try {
        const { nome, descricao, sintomas, informacoes_adicionais } = req.body;
        const { id } = req.params;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `UPDATE transtornos
             SET nome = ?, descricao = ?, sintomas = ?, informacoes_adicionais = ?
             WHERE id = ?`,
            [nome, descricao, sintomas || null, informacoes_adicionais || null, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Transtorno não encontrado.' });
        }

        res.json({ mensagem: 'Transtorno atualizado com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao editar transtorno.' });
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM transtornos WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Transtorno não encontrado.' });
        }

        res.json({ mensagem: 'Transtorno excluído com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao excluir transtorno.' });
    }
}

module.exports = { listar, cadastrar, editar, excluir };
