const AlunoRepository = require('../repository/AlunoRepository');

class AlunoModel {
    async create({ matricula, nome, email, telefone }) {
        if (await AlunoRepository.findByEmail(email)) {
            throw new Error('Email já está em uso.');
        }
        if (await AlunoRepository.findByMatricula(matricula)) {
            throw new Error('Matrícula já está em uso.');
        }

        return AlunoRepository.create({ matricula, nome, email, telefone });
    }

    async findById(id) {
        return AlunoRepository.findById(id);
    }

    async findByMatricula(matricula) {
        return AlunoRepository.findByMatricula(matricula);
    }

    async findByEmail(email) {
        return AlunoRepository.findByEmail(email);
    }

    async findAll() {
        return AlunoRepository.findAll();
    }

    async update(id, updates) {
        if (updates.matricula) {
            const existing = await AlunoRepository.findByMatricula(updates.matricula);
            if (existing && existing.id !== parseInt(id)) {
                throw new Error('Matrícula já está em uso.');
            }
        }
        if (updates.email) {
            const existing = await AlunoRepository.findByEmail(updates.email);
            if (existing && existing.id !== parseInt(id)) {
                throw new Error('Email já está em uso.');
            }
        }

        const updatedAluno = await AlunoRepository.update(id, updates);
        return updatedAluno ? 1 : 0;
    }

    async delete(id) {
        const deleted = await AlunoRepository.delete(id);
        return deleted ? 1 : 0;
    }
}

module.exports = new AlunoModel();
