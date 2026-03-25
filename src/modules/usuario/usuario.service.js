const bcrypt = require("bcrypt");
const usuarioRepository = require("./usuario.repository");
const ValidationError = require("../../error/ValidationError");
const ForbiddenError = require("../../error/ForbiddenError");

class UsuarioService {

    async criar(dados) {

        if (!dados.email.includes("@")) {
            throw new ValidationError("Email inválido");
        }

        if (dados.senha.length < 6) {
            throw new ValidationError("Senha muito fraca");
        }

        const existente = await usuarioRepository.buscarPorEmail(dados.email);

        if (existente) {
            throw new ValidationError("Email já cadastrado");
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        return usuarioRepository.criar({
            ...dados,
            senha: senhaHash,
            role: dados.role || "user",
            status: "ativo"
        });
    }

    async listar(filtros) {
        return usuarioRepository.listar(filtros);
    }

    async buscarPorId(id) {
        const usuario = await usuarioRepository.buscarPorId(id);

        if (!usuario) {
            throw new ValidationError("Usuário não encontrado");
        }

        return usuario;
    }

    async atualizar(id, dados, usuarioLogado) {

        if (usuarioLogado.role !== "admin" && usuarioLogado.id !== id) {
            throw new ForbiddenError("Sem permissão para atualizar");
        }

        return usuarioRepository.atualizar(id, dados);
    }

    async deletar(id, usuarioLogado) {

        if (usuarioLogado.role !== "admin") {
            throw new ForbiddenError("Apenas admin pode deletar");
        }

        return usuarioRepository.softDelete(id);
    }
}

module.exports = new UsuarioService();