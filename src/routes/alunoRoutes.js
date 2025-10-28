const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/AlunoController');
const authenticateToken = require('./../middleware/auth');

router.post('/', authenticateToken, AlunoController.create);

router.get('/', authenticateToken, AlunoController.findAll);

router.get('/:id', authenticateToken, AlunoController.findById);

router.put('/:id', authenticateToken, AlunoController.update);

router.delete('/:id', authenticateToken, AlunoController.delete);

module.exports = router;
