const express = require('express');
const router = express.Router();
const ProfessorController = require('../controllers/ProfessorController');
const authenticateToken = require('../middleware/auth');


router.post('/', authenticateToken, ProfessorController.create);

router.get('/', authenticateToken, ProfessorController.findAll);

router.get('/:id', authenticateToken, ProfessorController.findById);

router.put('/:id', authenticateToken, ProfessorController.update);

router.delete('/:id', authenticateToken, ProfessorController.delete);

module.exports = router;
