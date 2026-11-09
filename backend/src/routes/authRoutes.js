
const express = require('express');
const router = express.Router();

const {
    registrar,
    login,
    perfil
} = require('../controllers/authController');

const { autenticar } = require('../middlewares/authMiddleware');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', autenticar, perfil);

module.exports = router;
