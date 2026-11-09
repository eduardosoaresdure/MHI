
const express = require('express');
const router = express.Router();

const sentimentosController = require('../controllers/sentimentosController');
const { autenticar, somenteAdmin } = require('../middlewares/authMiddleware');

// Consulta liberada
router.get('/', sentimentosController.listar);

// Cadastro somente para administradores
router.post('/', autenticar, somenteAdmin, sentimentosController.cadastrar);

// Edição somente para administradores
router.put('/:id', autenticar, somenteAdmin, sentimentosController.editar);

// Exclusão somente para administradores
router.delete('/:id', autenticar, somenteAdmin, sentimentosController.excluir);

module.exports = router;
