
const db = require('../config/database');

async function listar(req, res) {
    try {
        const [localidades] = await db.query(
            'SELECT * FROM localidades ORDER BY nome'
        );
        res.json(localidades);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao consultar localidades.' });
    }
}

async function cadastrar(req, res) {
    try {
        const { nome, tipo_servico, endereco, telefone, latitude, longitude } = req.body;

        if (!nome || !tipo_servico || !endereco) {
            return res.status(400).json({
                erro: 'Nome, tipo de serviço e endereço são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `INSERT INTO localidades
            (nome, tipo_servico, endereco, telefone, latitude, longitude)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, tipo_servico, endereco, telefone || null, latitude ?? null, longitude ?? null]
        );

        res.status(201).json({
            mensagem: 'Localidade cadastrada com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar localidade.' });
    }
}

async function editar(req, res) {
    try {
        const { nome, tipo_servico, endereco, telefone, latitude, longitude } = req.body;
        const { id } = req.params;

        if (!nome || !tipo_servico || !endereco) {
            return res.status(400).json({
                erro: 'Nome, tipo de serviço e endereço são obrigatórios.'
            });
        }

        const [resultado] = await db.query(
            `UPDATE localidades
             SET nome = ?, tipo_servico = ?, endereco = ?, telefone = ?,
                 latitude = ?, longitude = ?
             WHERE id = ?`,
            [nome, tipo_servico, endereco, telefone || null, latitude ?? null, longitude ?? null, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Localidade não encontrada.' });
        }

        res.json({ mensagem: 'Localidade atualizada com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao editar localidade.' });
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM localidades WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Localidade não encontrada.' });
        }

        res.json({ mensagem: 'Localidade excluída com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao excluir localidade.' });
    }
}

module.exports = { listar, cadastrar, editar, excluir };
