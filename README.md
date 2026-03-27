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

## 📁 Estrutura do Projeto

```
/backend/
│
├── package.json
├── package-lock.json
├── .env
├── node_modules/
│
└── src/
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   ├── env.js
    │   ├── jwt.js
    │   ├── security.js
    │   └── rateLimit.js
    │
    ├── database/
    │   ├── connection.js
    │   ├── migration.js
    │   └── seed.js
    │
    ├── error/
    │   ├── AppError.js
    │   ├── UnauthorizedError.js
    │   ├── ForbiddenError.js
    │   └── ValidationError.js
    │
    ├── middlewares/
    │   ├── auth.middleware.js
    │   ├── role.middleware.js
    │   ├── validation.middleware.js
    │   ├── rateLimit.middleware.js
    │   ├── error.middleware.js
    │   ├── geoLocation.middleware.js
    │   ├── ipFilter.middleware.js
    │   ├── logger.middleware.js
    │   └── persistencia.middleware.js
    │
    └── modules/
        ├── auth/
        │   ├── auth.routes.js
        │   ├── auth.controller.js
        │   ├── auth.service.js
        │   └── auth.repository.js
        │
        └── usuario/
            ├── usuario.routes.js
            ├── usuario.controller.js
            ├── usuario.service.js
            └── usuario.repository.js
```

---

## ⚡ Instalação e execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
