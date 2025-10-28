const MatriculaModel = require('../models/MatriculaModel');
const AlunoModel = require('../models/AlunoModel');
const TurmaModel = require('../models/TurmaModel');

class MatriculaController {
    async create(req, res) {
        try {
            const { aluno_id, turmas_ids } = req.body;

            if (!aluno_id || !turmas_ids || !Array.isArray(turmas_ids) || turmas_ids.length === 0) {
                return res.status(400).json({ error: 'aluno_id e turmas_ids (array) são obrigatórios.' });
            }

            const aluno = await AlunoModel.findById(aluno_id);
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado.' });
            }

            const results = [];
            for (const turma_id of turmas_ids) {
                try {
                    const turma = await TurmaModel.findById(turma_id);
                    if (!turma || !turma.id) {
                        results.push({ turma_id, status: 'error', message: 'Turma não encontrada.' });
                        continue;
                    }

                    const matriculaId = await MatriculaModel.create({ aluno_id, turma_id });
                    results.push({ turma_id, status: 'success', matricula_id: matriculaId, disciplina: turma.nome_disciplina });

                } catch (error) {
                    if (error.message.includes('UNIQUE constraint failed: matriculas.aluno_id, matriculas.turma_id')) {
                        results.push({ turma_id, status: 'error', message: 'Aluno já matriculado nesta turma.' });
                    } else {
                        results.push({ turma_id, status: 'error', message: error.message });
                    }
                }
            }

            const successCount = results.filter(r => r.status === 'success').length;
            const errorCount = results.filter(r => r.status === 'error').length;

            if (successCount > 0 && errorCount === 0) {
                return res.status(201).json({ message: 'Matrícula(s) realizada(s) com sucesso!', results });
            } else if (successCount > 0 && errorCount > 0) {
                return res.status(207).json({ message: 'Matrícula(s) realizada(s) com algumas falhas.', results });
            } else {
                return res.status(400).json({ error: 'Nenhuma matrícula foi realizada. Verifique os erros.', results });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno ao processar matrículas.' });
        }
    }

    async findByAluno(req, res) {
        try {
            const { aluno_id } = req.params;

            const aluno = await AlunoModel.findById(aluno_id);
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado.' });
            }

            const matriculas = await MatriculaModel.findByAlunoId(aluno_id);
            res.status(200).json({ aluno: aluno.nome, matriculas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar matrículas do aluno.' });
        }
    }

    async findByTurma(req, res) {
        try {
            const { turma_id } = req.params;

            const turma = await TurmaModel.findById(turma_id);
            if (!turma || !turma.id) {
                return res.status(404).json({ error: 'Turma não encontrada.' });
            }

            const alunos = await MatriculaModel.findByTurmaId(turma_id);
            res.status(200).json({ turma: turma.nome_disciplina, alunos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar alunos da turma.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const changes = await MatriculaModel.delete(id);

            if (changes === 0) {
                return res.status(404).json({ error: 'Matrícula não encontrada.' });
            }

            res.status(200).json({ message: 'Matrícula cancelada com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cancelar matrícula.' });
        }
    }
}

module.exports = new MatriculaController();
