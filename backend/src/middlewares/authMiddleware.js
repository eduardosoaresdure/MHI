
const jwt = require('jsonwebtoken');
const db = require('../config/database');

async function autenticar(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                mensagem: 'Token não fornecido!'
            });
        }

        const token = authorization.split(' ')[1];

        const dados = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o usuário atualizado no banco
        const [usuarios] = await db.query(
            'SELECT id, nome, email, nivel_usuario FROM usuarios WHERE id = ?',
            [dados.id]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: 'Usuário não encontrado!'
            });
        }

        req.usuario = usuarios[0];

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado!'
        });
    }
}

function somenteAdmin(req, res, next) {
    if (req.usuario.nivel_usuario !== 'admin') {
        return res.status(403).json({
            mensagem: 'Acesso permitido somente para administradores!'
        });
    }

    next();
}

module.exports = {
    autenticar,
    somenteAdmin
};
