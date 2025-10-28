const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const professorRoutes = require('./professorRoutes');
const alunoRoutes = require('./alunoRoutes');
const turmaRoutes = require('./turmaRoutes');
const matriculaRoutes = require('./matriculaRoutes');

router.use('/auth', authRoutes);

router.use('/professores', professorRoutes);
router.use('/alunos', alunoRoutes);
router.use('/turmas', turmaRoutes);
router.use('/matriculas', matriculaRoutes);

module.exports = router;
