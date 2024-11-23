import { Context } from "hono"
import Producto from "./productTypes"
import { prisma } from '../config/prisma'


export const getProduct = async (c: Context) => {
    try {
        const producto = await prisma.producto.findMany({})

        return c.json({ message: 'Productos obtenidos correctamente', producto }, { status: 200 })
    } catch (error) {
        return c.json({ error: 'Product Not Found' }, { status: 400 })
    }
}

export const getProductById = async (c: Context) => {
    try {
        const idx = (c.req.param("id"));


        const productId = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!productId) {
            throw new Error('Id Not Found')
        }

        return c.json({ message: 'Producto obtenido correctamente', producto: productId }, { status: 200 })
    } catch (error) {
        return c.json({ error: 'Product Not Found' }, { status: 400 })
    }
}

export const createProduct = async (c: Context) => {
    try {
        const idx = (c.req.param("id"));

        const productId = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!productId) {
            throw new Error('Id Not Found')
        }

        const pro: Producto = await c.req.json()

        const producto = await prisma.producto.create({
            data: {
                nombre: pro.nombre,
                precio: pro.precio,
                stock: pro.stock,
                descripcion: pro.descripcion
            }
        })
        return c.json({ message: 'Product created successfully', producto }, { status: 200 })

    } catch (error) {
        return c.json({ message: 'Error creating product', error }, { status: 400 })
    }
}

export const updateProduct = async (c: Context) => {

    const idx = c.req.param("id");

    try {
        const productoActualizado = await c.req.json();

        const producto = await prisma.producto.update({
            where: {
                id: idx,
            },
            data: {
                ...productoActualizado,
            },
        });

        if (!producto) {
            throw new Error("Id Not Found");
        }

        return c.json({ message: "Producto Actualizado", producto: producto }, { status: 200 });

    } catch (error) {
        return c.json({ error: "No se pudo actualizar el producto" }, { status: 400 });
    }
};


export const deleteProduct = async (c: Context) => {
    try {
        const idx = c.req.param("id")

        const producto = await prisma.producto.findUnique({
            where: {
                id: idx
            }
        })

        if (!producto){
            throw new Error('Id Not Found')
        }

        const productoEliminado = await prisma.producto.delete({
            where: {
                id: idx
            }
        })

        return c.json({ message: 'Product Deleted Success', producto}, {status: 200})
    } catch (err) {
        return c.json({ error: 'Error al Eliminar Producto', err}, {status: 400})
    }
}