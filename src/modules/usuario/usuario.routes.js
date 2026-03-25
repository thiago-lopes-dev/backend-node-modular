const express = require("express");
const router = express.Router();

const usuarioController = require("./usuario.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const autorizarRole = require("../../middlewares/role.middleware");

router.post("/", usuarioController.criar);

router.get(
    "/",
    authMiddleware,
    autorizarRole("admin"),
    usuarioController.listar
);

router.get(
    "/:id",
    authMiddleware,
    usuarioController.buscarPorId
);

router.put(
    "/:id",
    authMiddleware,
    usuarioController.atualizar
);

router.delete(
    "/:id",
    authMiddleware,
    autorizarRole("admin"),
    usuarioController.deletar
);

module.exports = router;