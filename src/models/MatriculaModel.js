const MatriculaRepository = require('../repository/MatriculaRepository');
const TurmaRepository = require('../repository/TurmaRepository');
const AlunoRepository = require('../repository/AlunoRepository');
const TurmaModel = require('./TurmaModel'); // Mantém para usar a lógica de isFull

class MatriculaModel {
    async create({ aluno_id, turma_id }) {
        const isFull = await TurmaModel.isFull(turma_id);
        if (isFull) {
            throw new Error('A turma atingiu a quantidade máxima de alunos.');
        }

        const turma = await TurmaRepository.findById(turma_id);
        if (!turma) {
            throw new Error('Turma não encontrada.');
        }
        const dia_semana_turma = turma.dia_semana;

        const matriculasDoAluno = await MatriculaRepository.findByAlunoId(aluno_id);
        for (const matricula of matriculasDoAluno) {
            const turmaExistente = await TurmaRepository.findById(matricula.turma_id);
            if (turmaExistente && turmaExistente.dia_semana === dia_semana_turma) {
                throw new Error('O aluno já está matriculado em outra turma no mesmo dia da semana.');
            }
        }

        const data_hora_matricula = new Date().toISOString();
        return MatriculaRepository.create({ aluno_id: parseInt(aluno_id), turma_id: parseInt(turma_id), data_hora_matricula });
    }

    async findByAlunoId(aluno_id) {
        const matriculas = await MatriculaRepository.findByAlunoId(aluno_id);
        const results = await Promise.all(matriculas.map(async (m) => {
            const turma = await TurmaRepository.findById(m.turma_id);
            return {
                id: m.id,
                data_hora_matricula: m.data_hora_matricula,
                nome_disciplina: turma ? turma.nome_disciplina : 'Turma Não Encontrada',
                semestre_letivo: turma ? turma.semestre_letivo : null,
                dia_semana: turma ? turma.dia_semana : null
            };
        }));
        return results;
    }

    async findByTurmaId(turma_id) {
        const matriculas = await MatriculaRepository.findByTurmaId(turma_id);
        const results = await Promise.all(matriculas.map(async (m) => {
            const aluno = await AlunoRepository.findById(m.aluno_id);
            return {
                id: m.id,
                data_hora_matricula: m.data_hora_matricula,
                matricula: aluno ? aluno.matricula : null,
                aluno_nome: aluno ? aluno.nome : 'Aluno Não Encontrado',
                email: aluno ? aluno.email : null
            };
        }));
        return results;
    }

    async delete(id) {
        const deleted = await MatriculaRepository.delete(id);
        return deleted ? 1 : 0;
    }
}

module.exports = new MatriculaModel();
