
---

###**Badges**
Você pode adicionar **badges no topo do README** para deixar bonito e profissional:

```markdown
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

# 🚀 API Sistema

API backend com autenticação JWT, gerenciamento de usuários, segurança avançada, logs detalhados e controle de acesso.

---

## 💻 Funcionalidades principais da API

1. **Login e autenticação**
   
   - Rotas de `/auth` para login, logout e registro de usuários.
   - Utiliza **JWT (token)** para validar usuários logados.
   - Tokens expiram em 1 hora (`JWT_EXPIRES_IN=1h`).

2. **Gerenciamento de usuários**
   
   - Rotas `/usuarios` para criar, listar, atualizar e deletar usuários.
   - Possibilidade de limitar acesso mediante autenticação.

3. **Saúde da API**
   
   - Rota `/health` retorna status da API (`OK`), ambiente (`development` ou `production`) e timestamp.
   - Serve para monitorar se o servidor está funcionando.

4. **Aceitar dados**
   
   - Recebe **JSON** e dados de **formulários HTML**.
   - Limite de tamanho do envio: 10MB.

---

## 🛡️ Segurança e proteção

1. **Proteções HTTP básicas**
   
   - Helmet → impede ataques comuns via cabeçalhos HTTP.

2. **Controle de acesso (CORS)**
   
   - Produção: apenas sites autorizados podem acessar a API.
   - Desenvolvimento: acesso liberado para testes.

3. **Rate limit**
   
   - Limita quantas requisições um usuário pode fazer em determinado tempo → evita abuso e ataques.

4. **Filtro de IP**
   
   - Permite ou bloqueia usuários com base no IP.

5. **Filtro por geolocalização**
   
   - Permite ou bloqueia usuários dependendo do país.

6. **Logs**
   
   - Todas as requisições podem ser registradas.
   - Persistência opcional → salvar logs no banco ou arquivo.

7. **Tratamento de erros**
   
   - Captura erros da aplicação e erros críticos do Node.js (Promises rejeitadas e exceções não tratadas).

---

## 🚀 Operações do servidor

1. **Inicialização**
   
   - Conecta ao banco de dados e testa se está vivo.
   - Executa migrations → cria/atualiza tabelas automaticamente.

2. **Execução**
   
   - Cria servidor HTTP que escuta requisições.
   - Se a porta estiver ocupada, tenta outra automaticamente.

3. **Desligamento seguro (graceful shutdown)**
   
   - Fecha servidor e conexões com banco de forma organizada.
   - Se travar, força encerramento após 10 segundos.

Resumindo “quem faz o quê” na API
| Funcionalidade        | Como funciona                           | Observações                                 |
| --------------------- | --------------------------------------- | ------------------------------------------- |
| Login / JWT           | Usuário envia login → API retorna token | Token dura 1h                               |
| Cadastro / usuários   | Criar, listar, atualizar, deletar       | Autenticação necessária                     |
| Proteções HTTP        | Helmet                                  | Protege cabeçalhos                          |
| Controle de origem    | CORS                                    | Apenas sites autorizados entram em produção |
| Limite de requisições | rateLimit                               | Evita flood ou ataques                      |
| Bloqueio de IP        | ipFilter                                | Bloqueia IPs maliciosos                     |
| Bloqueio por país     | geoLocation                             | Permite apenas países liberados             |
| Logs detalhados       | loggerMiddleware                        | Pode salvar no banco se ativado             |
| Health check          | `/health`                               | Verifica status da API                      |
| Tratamento de erros   | errorMiddleware + Node global           | Captura erros e evita crash                 |
| Banco de dados        | Conexão + migrations                    | Testa conexão, atualiza tabelas             |


## 🛠️ Tecnologias e pré-requisitos

- Node.js 18+
- Express
- PostgreSQL
- JWT (JSON Web Token)
- Helmet, CORS, Compression
- Git

## ⚡ Instalação e execução

 Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git


---

### **Estrutura de pastas**
Exibir a árvore do projeto, já com explicação de cada arquivo/pasta:

```markdown
## 📂 Estrutura do projeto

📁 projeto-sistema
├── 📁 src
│   ├── 📄 app.js        # Cérebro da aplicação, middlewares e rotas
│   ├── 📄 server.js     # Inicializa servidor, conecta banco, executa migrations
│   └── 📁 routes
│       ├── 📄 auth.js   # Rotas de autenticação
│       └── 📄 usuarios.js # Rotas de usuários
├── 📁 config
│   └── 📄 env.js        # Configurações do ambiente (.env)
├── 📁 database
│   ├── 📄 connection.js # Conexão com banco
│   └── 📄 migration.js  # Criação/atualização de tabelas
├── 📄 package.json      # Dependências e scripts
└── 📄 README.md         # Documentação

## 💡 Exemplos de uso

1. Login:
```bash
POST /auth/login
Body: { "email": "usuario@teste.com", "password": "123456" }

POST /usuarios
Header: Authorization: Bearer <token>
Body: { "nome": "João", "email": "joao@teste.com" }
