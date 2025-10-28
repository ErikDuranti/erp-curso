const ProfessorRepository = require('../repository/ProfessorRepository');

class ProfessorModel {
    async create({ nome, email, telefone, escolaridade }) {
        const existingProfessor = await ProfessorRepository.findByEmail(email);
        if (existingProfessor) {
            throw new Error('Email já está em uso.');
        }

        return ProfessorRepository.create({ nome, email, telefone, escolaridade });
    }

    async findById(id) {
        return ProfessorRepository.findById(id);
    }

    async findByEmail(email) {
        return ProfessorRepository.findByEmail(email);
    }

    async findAll() {
        return ProfessorRepository.findAll();
    }

    async update(id, updates) {
        if (updates.email) {
            const existing = await ProfessorRepository.findByEmail(updates.email);
            if (existing && existing.id !== parseInt(id)) {
                throw new Error('Email já está em uso.');
            }
        }

        const updatedProfessor = await ProfessorRepository.update(id, updates);
        return updatedProfessor ? 1 : 0;
    }

    async delete(id) {
        const deleted = await ProfessorRepository.delete(id);
        return deleted ? 1 : 0;
    }
}

module.exports = new ProfessorModel();
