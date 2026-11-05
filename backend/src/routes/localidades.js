const express = require('express');
const router = express.Router();

const localidadesController = require('../controllers/localidadesController');

router.get('/', localidadesController.listar);
router.post('/', localidadesController.cadastrar);

module.exports = router;