
const db = require('../config/database');

async function listar(req, res) {
    try {
        const [localidades] = await db.query(
            'SELECT * FROM localidades ORDER BY nome'
        );

        res.json(localidades);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao consultar localidades.'
        });
    }
}

async function cadastrar(req, res) {
    try {
        const {
            nome,
            tipo_servico,
            endereco,
            telefone,
            latitude,
            longitude
        } = req.body;

        if (!nome || !tipo_servico || !endereco) {
            return res.status(400).json({
                erro: 'Nome, tipo de serviço e endereço são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO localidades
            (nome, tipo_servico, endereco, telefone, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nome,
                tipo_servico,
                endereco,
                telefone || null,
                latitude ?? null,
                longitude ?? null
            ]
        );

        res.status(201).json({
            mensagem: 'Localidade cadastrada com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao cadastrar localidade.'
        });
    }
}

module.exports = { listar, cadastrar };
