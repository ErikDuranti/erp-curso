const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
    async register(req, res) {
        try {
            const { nome_completo, email, senha } = req.body;

            if (!nome_completo || !email || !senha) {
                return res.status(400).json({ error: 'Nome completo, email e senha são obrigatórios.' });
            }

            const user = await UserModel.create({ nome_completo, email, senha });

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

            res.status(201).json({ message: 'Usuário registrado com sucesso!', user, token });
        } catch (error) {
            console.error(error);
            if (error.message.includes('Email já cadastrado.')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: 'Erro ao registrar usuário.' });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }

            const userWithHash = await UserModel.findByEmailForAuth(email);
            if (!userWithHash) {
                return res.status(401).json({ error: 'Email ou senha inválidos.' });
            }

            const isMatch = await UserModel.comparePassword(senha, userWithHash.senha);
            if (!isMatch) {
                return res.status(401).json({ error: 'Email ou senha inválidos.' });
            }

            const token = jwt.sign({ id: userWithHash.id, email: userWithHash.email, role: userWithHash.role }, SECRET_KEY, { expiresIn: '1h' });

            const { senha: _, ...userWithoutPassword } = userWithHash;

            res.status(200).json({ message: 'Login realizado com sucesso!', user: userWithoutPassword, token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao realizar login.' });
        }
    }
}

module.exports = new AuthController();
