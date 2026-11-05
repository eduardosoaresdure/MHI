const express = require('express');
const router = express.Router();

const transtornosController = require('../controllers/transtornosController');

router.get('/', transtornosController.listar);
router.post('/', transtornosController.cadastrar);

module.exports = router;