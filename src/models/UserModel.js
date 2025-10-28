const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');

class UserModel {
    async create({ nome_completo, email, senha, role = 'aluno' }) {
        if (await UserRepository.findByEmail(email)) {
            throw new Error('Email já cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = await UserRepository.create({ nome_completo, email, senha: hashedPassword, role });
        
        const { senha: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async findByEmailForAuth(email) {
        return UserRepository.findByEmail(email);
    }

    async findById(id) {
        const user = await UserRepository.findById(id);
        if (!user) return undefined;

        const { senha, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async comparePassword(senha, hash) {
        return bcrypt.compare(senha, hash);
    }
}

module.exports = new UserModel();
