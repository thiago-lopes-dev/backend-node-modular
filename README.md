💻 Funcionalidades principais da API
Login e autenticação
Rotas de /auth para login, logout e registro de usuários.
Utiliza JWT (token) para validar usuários logados.
Tokens expiram em 1 hora (JWT_EXPIRES_IN=1h).
Gerenciamento de usuários
Rotas /usuarios para criar, listar, atualizar e deletar usuários.
Possibilidade de limitar acesso mediante autenticação.
Saúde da API
Rota /health retorna status da API (OK), ambiente (development ou production) e timestamp.
Serve para monitorar se o servidor está funcionando.
Aceitar dados
Recebe JSON e dados de formulários HTML.
Limite de tamanho do envio: 10MB.

🛡️ Segurança e proteção
Proteções HTTP básicas
Helmet → impede ataques comuns via cabeçalhos HTTP.
Controle de acesso (CORS)
Produção: apenas sites autorizados podem acessar a API.
Desenvolvimento: acesso liberado para testes.
Rate limit
Limita quantas requisições um usuário pode fazer em determinado tempo → evita abuso e ataques.
Filtro de IP
Permite ou bloqueia usuários com base no IP.
Filtro por geolocalização
Permite ou bloqueia usuários dependendo do país.
Logs
Todas as requisições podem ser registradas.
Persistência opcional → salvar logs no banco ou arquivo.
Tratamento de erros
Captura erros da aplicação e erros críticos do Node.js (Promises rejeitadas e exceções não tratadas).

🚀 Operações do servidor
Inicialização
Conecta ao banco de dados e testa se está vivo.
Executa migrations → cria/atualiza tabelas automaticamente.
Execução
Cria servidor HTTP que escuta requisições.
Se a porta estiver ocupada, tenta outra automaticamente.
Desligamento seguro (graceful shutdown)
Fecha servidor e conexões com banco de forma organizada.
Se travar, força encerramento após 10 segundos.

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
