
const express = require('express');
const router = express.Router();

const transtornosController = require('../controllers/transtornosController');
const { autenticar, somenteAdmin } = require('../middlewares/authMiddleware');

router.get('/', transtornosController.listar);

router.post('/', autenticar, somenteAdmin, transtornosController.cadastrar);

router.put('/:id', autenticar, somenteAdmin, transtornosController.editar);

router.delete('/:id', autenticar, somenteAdmin, transtornosController.excluir);

module.exports = router;
