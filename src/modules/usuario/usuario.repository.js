const connection = require("../../database/connection");

async function criar(dados) {
    const [usuario] = await connection("usuarios")
        .insert(dados)
        .returning("*");

    return usuario;
}

async function buscarPorEmail(email) {
    return connection("usuarios")
        .where({ email })
        .first();
}

async function buscarPorId(id) {
    return connection("usuarios")
        .where({ id })
        .first();
}

async function listar() {
    return connection("usuarios")
        .whereNull("deleted_at");
}

async function atualizar(id, dados) {
    await connection("usuarios")
        .where({ id })
        .update({
            ...dados,
            updated_at: connection.fn.now()
        });

    return buscarPorId(id);
}

async function softDelete(id) {
    return connection("usuarios")
        .where({ id })
        .update({
            deleted_at: connection.fn.now()
        });
}

module.exports = {
    criar,
    buscarPorEmail,
    buscarPorId,
    listar,
    atualizar,
    softDelete
};