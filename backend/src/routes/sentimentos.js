const express = require('express');
const router = express.Router();

const sentimentosController = require('../controllers/sentimentosController');

router.get('/', sentimentosController.listar);
router.post('/', sentimentosController.cadastrar);

module.exports = router;