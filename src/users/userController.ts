import { Context } from "hono";
import { prisma } from "../config/prisma";

export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();

        const hashPass = await Bun.password.hash(user.password);

        const usuario = await prisma.usuario.create({
            data: {
                nombre: user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase(),
                email: user.email,
                password: hashPass,
                dni: user.dni,
                role_id: user.role_id,
            },
        });

        // Convertimos `role_id` a un número o string antes de devolverlo
        const response = {
            ...usuario,
            role_id: usuario.role_id ? usuario.role_id.toString() : null,
        };

        return c.json({ message: "User Created", usuario: response }, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return c.json({ error: "Error al Crear Usuario", details: errorMessage }, { status: 400 });
    }
};




export const getUser = (c: Context) => {
    return c.json({ message: 'Get User'})
}