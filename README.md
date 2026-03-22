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
---

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

---

## 💡 Exemplos de uso

### 1️⃣ Login

**Rota:** `POST /auth/login`  
**Body (JSON):**
```json
{
  "email": "usuario@teste.com",
  "password": "123456"
}

Cadastro de usuário

Rota: POST /usuarios
Headers:

Authorization: Bearer <token>
Content-Type: application/json

Body (JSON):

{
  "nome": "Maria",
  "email": "maria@teste.com",
  "password": "123456"
}

Listar todos os usuários

Rota: GET /usuarios
Headers:

Authorization: Bearer <token>

Buscar usuário por ID

Rota: GET /usuarios/:id
Exemplo: /usuarios/1
Headers:

Authorization: Bearer <token>


Atualizar usuário

Rota: PUT /usuarios/:id
Exemplo: /usuarios/2
Headers:

Authorization: Bearer <token>
Content-Type: application/json

Body (JSON):

{
  "nome": "Maria Souza",
  "email": "maria.souza@teste.com"
}

Deletar usuário

Rota: DELETE /usuarios/:id
Exemplo: /usuarios/2
Headers:

Authorization: Bearer <token>

Health Check

Rota: GET /health
Resposta esperada:

{
  "status": "OK",
  "environment": "development",
  "timestamp": "2026-03-22T12:00:00.000Z"
}

---

---

✅ **O que isso cobre:**
- Login → pegar token JWT  
- Criar usuário → POST com token  
- Listar usuários → GET com token  
- Buscar usuário por ID → GET com token  
- Atualizar usuário → PUT com token  
- Deletar usuário → DELETE com token  
- Health check → verificar se a API está viva  

---


## ⚡ Instalação e execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
