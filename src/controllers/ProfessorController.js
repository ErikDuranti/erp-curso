const ProfessorModel = require('../models/ProfessorModel');

class ProfessorController {
    async create(req, res) {
        try {
            const { nome, email, telefone, escolaridade } = req.body;

            if (!nome || !email || !escolaridade) {
                return res.status(400).json({ error: 'Nome, email e escolaridade são obrigatórios.' });
            }

            const existingProfessor = await ProfessorModel.findByEmail(email);
            if (existingProfessor) {
                return res.status(409).json({ error: 'Já existe um professor cadastrado com este email.' });
            }

            const professorId = await ProfessorModel.create({ nome, email, telefone, escolaridade });
            const newProfessor = await ProfessorModel.findById(professorId);

            res.status(201).json({ message: 'Professor cadastrado com sucesso!', professor: newProfessor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar professor.' });
        }
    }

    async findAll(req, res) {
        try {
            const professores = await ProfessorModel.findAll();
            res.status(200).json(professores);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar professores.' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const professor = await ProfessorModel.findById(id);

            if (!professor) {
                return res.status(404).json({ error: 'Professor não encontrado.' });
            }

            res.status(200).json(professor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar professor.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const professor = await ProfessorModel.findById(id);
            if (!professor) {
                return res.status(404).json({ error: 'Professor não encontrado.' });
            }

            const changes = await ProfessorModel.update(id, updates);

            if (changes > 0) {
                const updatedProfessor = await ProfessorModel.findById(id);
                return res.status(200).json({ message: 'Professor atualizado com sucesso!', professor: updatedProfessor });
            }

            res.status(200).json({ message: 'Nenhuma alteração realizada.' });

        } catch (error) {
            console.error(error);
            if (error.message.includes('Email já está em uso.')) {
                return res.status(409).json({ error: 'O email fornecido já está em uso por outro professor.' });
            }
            res.status(500).json({ error: 'Erro ao atualizar professor.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const changes = await ProfessorModel.delete(id);

            if (changes === 0) {
                return res.status(404).json({ error: 'Professor não encontrado.' });
            }

            res.status(200).json({ message: 'Professor deletado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao deletar professor.' });
        }
    }
}

module.exports = new ProfessorController();
