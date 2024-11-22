import { Hono } from "hono";
import { createUser, getUser } from "./userController";

export const userRoutes = new Hono()

userRoutes.get('/create', createUser)
userRoutes.get('/user', getUser)