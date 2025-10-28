# ERP de Cursos - API REST em Node.js (Versão Simplificada em Memória)

Este projeto consiste em uma API REST para gerenciamento de cursos (ERP - Enterprise Resource Planning) desenvolvida em Node.js e Express.js. A aplicação foi construída com o objetivo de ser o mais simples e didática possível, utilizando um padrão de arquitetura limpo (Repository Pattern) e armazenamento de dados **exclusivamente em memória** para não requerer configuração de banco de dados.

**Atenção:** Por utilizar armazenamento em memória, todos os dados cadastrados serão **perdidos** ao final da execução do servidor.

## 🚀 Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução.
*   **Express.js**: Framework web minimalista para Node.js.
*   **bcrypt**: Para hashing seguro de senhas de usuários.
*   **jsonwebtoken (JWT)**: Para autenticação e proteção de rotas.
*   **Padrão Repository**: Utilizado para separar a lógica de acesso aos dados (CRUD) da lógica de negócio (validações e Regras de Negócio).

## 📂 Estrutura do Projeto

A estrutura de pastas segue o padrão MVC (Model-View-Controller) adaptado para APIs, com a adição das camadas de Repositório e Middleware:

```
erp-cursos/
├── src/
│   ├── controllers/      # Lógica de processamento da requisição (HTTP)
│   ├── db/               # Simulação do banco de dados em memória (memory-db.js)
│   ├── middleware/       # Lógica de autenticação (JWT)
│   ├── models/           # Lógica de Negócio e Regras de Negócio (RNs)
│   ├── repository/       # Camada de acesso aos dados (CRUD em memória)
│   ├── routes/           # Definição dos endpoints da API
│   └── server.js         # Arquivo principal de inicialização do Express
├── .env                  # Variáveis de ambiente (porta, chave secreta JWT)
├── package.json
├── POSTMAN_GUIDE.md      # Guia completo para testes via Postman
└── README.md
```

## ⚙️ Instalação e Execução

### Pré-requisitos

*   Node.js (versão recomendada 18+)
*   npm (gerenciador de pacotes)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ErikDuranti/erp-curso.git
    cd erp-curso
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
    ```
    PORT=3000
    SECRET_KEY=sua_chave_secreta_aqui
    ```

4.  **Inicie o Servidor:**
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

## 🔒 Autenticação e Rotas

Todas as rotas de gerenciamento (Professores, Alunos, Turmas, Matrículas) são protegidas por JWT.

### Endpoints de Autenticação

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cadastra um novo usuário. |
| `POST` | `/api/auth/login` | Realiza o login e retorna um **Token JWT**. |

**Para acessar as rotas protegidas**, inclua o Token JWT no cabeçalho da requisição:
`Authorization: Bearer <SEU_TOKEN_JWT_AQUI>`

## ✅ Regras de Negócio Implementadas

O sistema implementa as seguintes regras, conforme especificado:

1.  **Cadastro de Professores (C), Alunos (A), Turmas (B), Usuários (A).**
2.  **RN de Unicidade:** E-mails e Matrículas devem ser únicos.
3.  **RN de Matrícula (Dia da Semana):** Um aluno não pode se matricular em duas turmas que ocorram no mesmo dia da semana.
4.  **RN de Capacidade Máxima:** Uma turma não pode superar a quantidade máxima de alunos definida.

## 🧪 Como Testar a API (Postman)

Para um guia detalhado sobre como testar cada endpoint (incluindo exemplos de JSON para cadastro e testes das Regras de Negócio), consulte o arquivo **`POSTMAN_GUIDE.md`** dentro deste repositório.

---
*Desenvolvido com Node.js e Express.js*
