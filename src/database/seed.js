const bcrypt = require("bcryptjs");
const connection = require("./connection");

async function runSeed() {
    try {

        const adminExiste = await connection("usuarios")
            .where({ email: "admin@sistema.com" })
            .first();

        if (!adminExiste) {

            const senhaHash = await bcrypt.hash("admin123", 10);

            await connection("usuarios").insert({
                nome: "Administrador",
                email: "admin@sistema.com",
                senha: senhaHash,
                role: "admin",
                status: "ativo"
            });

            console.log("Admin criado com sucesso");
        } else {
            console.log("Admin já existe");
        }

        process.exit(0);

    } catch (error) {
        console.error("Erro no seed:", error);
        process.exit(1);
    }
}

runSeed();