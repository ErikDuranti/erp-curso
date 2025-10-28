const BaseRepository = require('./BaseRepository');

class MatriculaRepository extends BaseRepository {
    constructor() {
        super('matriculas');
    }

    async findByAlunoId(aluno_id) {
        return this.findManyBy('aluno_id', parseInt(aluno_id));
    }

    async findByTurmaId(turma_id) {
        return this.findManyBy('turma_id', parseInt(turma_id));
    }

    async findByAlunoAndTurma(aluno_id, turma_id) {
        const allMatriculas = await this.findAll();
        return allMatriculas.find(
            m => m.aluno_id === parseInt(aluno_id) && m.turma_id === parseInt(turma_id)
        );
    }
}

module.exports = new MatriculaRepository();
