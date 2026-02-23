const usuarioService = require("./usuario.service");

class UsuarioController {

    async criar(req, res, next) {
        try {
            const usuario = await usuarioService.criar(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {
        try {
            const usuarios = await usuarioService.listar(req.query);
            return res.json(usuarios);
        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const usuario = await usuarioService.buscarPorId(req.params.id);
            return res.json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async atualizar(req, res, next) {
        try {
            const usuario = await usuarioService.atualizar(
                req.params.id,
                req.body,
                req.usuario
            );

            return res.json(usuario);
        } catch (error) {
            next(error);
        }
    }

    async deletar(req, res, next) {
        try {
            await usuarioService.deletar(req.params.id, req.usuario);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsuarioController();