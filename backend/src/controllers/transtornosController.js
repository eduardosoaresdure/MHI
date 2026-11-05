
const db = require('../config/database');

async function listar(req, res) {
    try {
        const [transtornos] = await db.query(
            'SELECT * FROM transtornos ORDER BY nome'
        );

        res.json(transtornos);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao consultar transtornos.'
        });
    }
}

async function cadastrar(req, res) {
    try {
        const {
            nome,
            descricao,
            sintomas,
            informacoes_adicionais
        } = req.body;

        if (!nome || !descricao) {
            return res.status(400).json({
                erro: 'Nome e descrição são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO transtornos
            (nome, descricao, sintomas, informacoes_adicionais)
            VALUES (?, ?, ?, ?)`,
            [
                nome,
                descricao,
                sintomas || null,
                informacoes_adicionais || null
            ]
        );

        res.status(201).json({
            mensagem: 'Transtorno cadastrado com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao cadastrar transtorno.'
        });
    }
}

module.exports = { listar, cadastrar };
