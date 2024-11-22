import { Context } from "hono"
import Producto from "./productTypes"
import {prisma} from '../config/prisma'


export const getProduct = async (c: Context) => {
    try {
        const producto = await prisma.producto.findMany({})

        return c.json({ message: 'Productos obtenidos correctamente', producto }, {status: 200})
    } catch (error) {
        return c.json({ error: 'Product Not Found'}, {status: 400})
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

        if (!productId){
            throw new Error ('Id Not Found')
        }

        return c.json({ message: 'Producto obtenido correctamente', producto: productId }, {status: 200})
    } catch (error) {
        return c.json({ error: 'Product Not Found'}, {status: 400})
    }
}

export const createProduct = async (c: Context) => {
    try {
        const pro : Producto = await c.req.json()
        
        const producto = await prisma.producto.create({
            data: {
                nombre: pro.nombre,
                precio: pro.precio,
                stock: pro.stock,
                descripcion: pro.descripcion
            }
        })
        return c.json({ message: 'Product created successfully', producto }, {status: 200})

    } catch (error) {
        return c.json({ message: 'Error creating product', error }, {status: 400})
    }
}

export const updateProduct = (c: Context) => {
    return c.json({ message: 'Update Product'})
}

export const deleteProduct = (c: Context) => {
    return c.json({ message: 'Delete Product'})
}