const express = require('express');
const router = express.Router();
const MatriculaController = require('../controllers/MatriculaController');
const authenticateToken = require('./../middleware/auth');

router.post('/', authenticateToken, MatriculaController.create);

router.get('/aluno/:aluno_id', authenticateToken, MatriculaController.findByAluno);

router.get('/turma/:turma_id', authenticateToken, MatriculaController.findByTurma);

router.delete('/:id', authenticateToken, MatriculaController.delete);

module.exports = router;
