const express = require('express');
const router = express.Router();
const TurmaController = require('../controllers/TurmaController');
const authenticateToken = require('./../middleware/auth');

router.post('/', authenticateToken, TurmaController.create);

router.get('/', authenticateToken, TurmaController.findAll);

router.get('/:id', authenticateToken, TurmaController.findById);

router.put('/:id', authenticateToken, TurmaController.update);

router.delete('/:id', authenticateToken, TurmaController.delete);

module.exports = router;
