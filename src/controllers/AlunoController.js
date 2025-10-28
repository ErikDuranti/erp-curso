const AlunoModel = require('../models/AlunoModel');

class AlunoController {
    async create(req, res) {
        try {
            const { matricula, nome, email, telefone } = req.body;

            if (!matricula || !nome || !email) {
                return res.status(400).json({ error: 'Matrícula, nome e email são obrigatórios.' });
            }

            let existing = await AlunoModel.findByEmail(email);
            if (existing) {
                return res.status(409).json({ error: 'Já existe um aluno cadastrado com este email.' });
            }
            existing = await AlunoModel.findByMatricula(matricula);
            if (existing) {
                return res.status(409).json({ error: 'Já existe um aluno cadastrado com esta matrícula.' });
            }

            const alunoId = await AlunoModel.create({ matricula, nome, email, telefone });
            const newAluno = await AlunoModel.findById(alunoId);

            res.status(201).json({ message: 'Aluno cadastrado com sucesso!', aluno: newAluno });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
        }
    }

    async findAll(req, res) {
        try {
            const alunos = await AlunoModel.findAll();
            res.status(200).json(alunos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar alunos.' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const aluno = await AlunoModel.findById(id);

            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado.' });
            }

            res.status(200).json(aluno);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar aluno.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const aluno = await AlunoModel.findById(id);
            if (!aluno) {
                return res.status(404).json({ error: 'Aluno não encontrado.' });
            }

            const changes = await AlunoModel.update(id, updates);

            if (changes > 0) {
                const updatedAluno = await AlunoModel.findById(id);
                return res.status(200).json({ message: 'Aluno atualizado com sucesso!', aluno: updatedAluno });
            }

            res.status(200).json({ message: 'Nenhuma alteração realizada.' });

        } catch (error) {
            console.error(error);
            if (error.message.includes('Matrícula já está em uso.') || error.message.includes('Email já está em uso.')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao atualizar aluno.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const changes = await AlunoModel.delete(id);

            if (changes === 0) {
                return res.status(404).json({ error: 'Aluno não encontrado.' });
            }

            res.status(200).json({ message: 'Aluno deletado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao deletar aluno.' });
        }
    }
}

module.exports = new AlunoController();
