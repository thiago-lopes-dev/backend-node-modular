const ValidationError = require("../errors/ValidationError");

/**
 * Middleware de validação robusto utilizando Zod
 * Substitui a verificação manual de campos por validação de esquema
 */
function validationMiddleware(schema) {
    return (req, res, next) => {
        // .safeParse retorna um objeto { success: true, data: ... } ou { success: false, error: ... }
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // Transforma os erros do Zod em uma string amigável para o seu ValidationError
            const mensagens = result.error.issues
                .map((issue) => {
                    const campo = issue.path.join(".");
                    return `${campo}: ${issue.message}`;
                })
                .join(", ");

            // Lança o seu erro customizado que já deve ser tratado pelo seu error.middleware
            throw new ValidationError(mensagens);
        }

        // Importante: req.body agora contém APENAS os dados validados pelo schema (limpa campos extras)
        req.body = result.data;
        next();
    };
}

module.exports = validationMiddleware;
