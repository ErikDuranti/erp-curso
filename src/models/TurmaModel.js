const TurmaRepository = require('../repository/TurmaRepository');
const ProfessorRepository = require('../repository/ProfessorRepository');
const MatriculaRepository = require('../repository/MatriculaRepository');

class TurmaModel {
    async create({ semestre_letivo, nome_disciplina, max_alunos, professor_id, dia_semana }) {
        return TurmaRepository.create({ semestre_letivo, nome_disciplina, max_alunos, professor_id, dia_semana });
    }

    async findById(id) {
        const turma = await TurmaRepository.findById(id);
        if (!turma) return undefined;

        const professor = await ProfessorRepository.findById(turma.professor_id);
        return {
            ...turma,
            professor_nome: professor ? professor.nome : 'Professor Não Encontrado'
        };
    }

    async findAll() {
        const turmas = await TurmaRepository.findAll();
        const turmasComProfessor = await Promise.all(turmas.map(async (turma) => {
            const professor = await ProfessorRepository.findById(turma.professor_id);
            return {
                ...turma,
                professor_nome: professor ? professor.nome : 'Professor Não Encontrado'
            };
        }));
        return turmasComProfessor;
    }

    async update(id, updates) {
        const updatedTurma = await TurmaRepository.update(id, updates);
        return updatedTurma ? 1 : 0;
    }

    async delete(id) {
        const deleted = await TurmaRepository.delete(id);
        return deleted ? 1 : 0;
    }

    async countAlunos(turma_id) {
        const matriculas = await MatriculaRepository.findByTurmaId(turma_id);
        return matriculas.length;
    }

    async isFull(turma_id) {
        const turma = await TurmaRepository.findById(turma_id);
        if (!turma) {
            throw new Error('Turma não encontrada.');
        }
        const current_alunos = await this.countAlunos(turma_id);
        return current_alunos >= turma.max_alunos;
    }
}

module.exports = new TurmaModel();
