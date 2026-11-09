
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CADASTRAR USUÁRIO
async function registrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos!'
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: 'A senha deve possuir pelo menos 6 caracteres!'
            });
        }

        const emailFormatado = email.trim().toLowerCase();

        // Verificar se o email já existe
        const [usuarios] = await db.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [emailFormatado]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensagem: 'Este email já está cadastrado!'
            });
        }

        // Criar hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Cadastro sempre começa como usuário comum
        await db.query(
            `INSERT INTO usuarios 
            (nome, email, senha_hash, nivel_usuario)
            VALUES (?, ?, ?, 'usuario')`,
            [nome.trim(), emailFormatado, senhaHash]
        );

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!'
        });

    } catch (erro) {
        console.error('Erro ao registrar usuário:', erro);

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar usuário.'
        });
    }
}

// REALIZAR LOGIN
async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Informe email e senha!'
            });
        }

        const emailFormatado = email.trim().toLowerCase();

        // Buscar usuário no banco
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [emailFormatado]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha incorretos!'
            });
        }

        const usuario = usuarios[0];

        // Comparar senha com hash armazenado
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: 'Email ou senha incorretos!'
            });
        }

        // Gerar token JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não configurado no .env');
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nivel_usuario: usuario.nivel_usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                nivel_usuario: usuario.nivel_usuario
            }
        });

    } catch (erro) {
        console.error('Erro ao realizar login:', erro);

        return res.status(500).json({
            mensagem: 'Erro interno ao realizar login.'
        });
    }
}

// CONSULTAR PERFIL
async function perfil(req, res) {
    try {
        const [usuarios] = await db.query(
            `SELECT id, nome, email, nivel_usuario
             FROM usuarios
             WHERE id = ?`,
            [req.usuario.id]
        );

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado!'
            });
        }

        return res.status(200).json(usuarios[0]);

    } catch (erro) {
        console.error('Erro ao consultar perfil:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao consultar perfil.'
        });
    }
}

module.exports = {
    registrar,
    login,
    perfil
};
