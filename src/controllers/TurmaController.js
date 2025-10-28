const TurmaModel = require('../models/TurmaModel');
const ProfessorModel = require('../models/ProfessorModel');

class TurmaController {
    async create(req, res) {
        try {
            const { semestre_letivo, nome_disciplina, max_alunos, professor_id, dia_semana } = req.body;

            if (!semestre_letivo || !nome_disciplina || !max_alunos || !professor_id || !dia_semana) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios para o cadastro de turma.' });
            }

            const professor = await ProfessorModel.findById(professor_id);
            if (!professor) {
                return res.status(404).json({ error: 'Professor não encontrado.' });
            }

            const turmaId = await TurmaModel.create({ semestre_letivo, nome_disciplina, max_alunos, professor_id, dia_semana });
            const newTurma = await TurmaModel.findById(turmaId);

            res.status(201).json({ message: 'Turma cadastrada com sucesso!', turma: newTurma });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar turma.' });
        }
    }

    async findAll(req, res) {
        try {
            const turmas = await TurmaModel.findAll();
            res.status(200).json(turmas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar turmas.' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const turma = await TurmaModel.findById(id);

            if (!turma || !turma.id) {
                return res.status(404).json({ error: 'Turma não encontrada.' });
            }

            res.status(200).json(turma);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar turma.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const turma = await TurmaModel.findById(id);
            if (!turma || !turma.id) {
                return res.status(404).json({ error: 'Turma não encontrada.' });
            }

            if (updates.professor_id && updates.professor_id !== turma.professor_id) {
                const professor = await ProfessorModel.findById(updates.professor_id);
                if (!professor) {
                    return res.status(404).json({ error: 'Novo professor não encontrado.' });
                }
            }

            const changes = await TurmaModel.update(id, updates);

            if (changes > 0) {
                const updatedTurma = await TurmaModel.findById(id);
                return res.status(200).json({ message: 'Turma atualizada com sucesso!', turma: updatedTurma });
            }

            res.status(200).json({ message: 'Nenhuma alteração realizada.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar turma.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const changes = await TurmaModel.delete(id);

            if (changes === 0) {
                return res.status(404).json({ error: 'Turma não encontrada.' });
            }

            res.status(200).json({ message: 'Turma deletada com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao deletar turma.' });
        }
    }
}

module.exports = new TurmaController();
