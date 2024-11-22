import { Context } from "hono"

export const createUser = (c: Context) => {
    return c.json({ message: 'Create User'})
}

export const getUser = (c: Context) => {
    return c.json({ message: 'Get User'})
}