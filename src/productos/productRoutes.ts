import { Hono } from "hono";
import {getProduct, createProduct, updateProduct, deleteProduct, getProductById} from '../productos/productController'

export const productRoutes = new Hono()

productRoutes.get('/get', getProduct)

productRoutes.post('/create', createProduct)

productRoutes.get('/get/:id', getProductById)

productRoutes.put('/update', updateProduct)

productRoutes.delete('/delete', deleteProduct)