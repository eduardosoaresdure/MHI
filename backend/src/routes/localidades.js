
const express = require('express');
const router = express.Router();

const localidadesController = require('../controllers/localidadesController');
const { autenticar, somenteAdmin } = require('../middlewares/authMiddleware');

router.get('/', localidadesController.listar);

router.post('/', autenticar, somenteAdmin, localidadesController.cadastrar);

router.put('/:id', autenticar, somenteAdmin, localidadesController.editar);

router.delete('/:id', autenticar, somenteAdmin, localidadesController.excluir);

module.exports = router;
