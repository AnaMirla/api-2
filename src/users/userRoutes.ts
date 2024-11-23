import { Hono } from "hono";
import { createUser, getUser } from "./userController";

export const userRoutes = new Hono();

userRoutes.post("/create", createUser);
userRoutes.get("/user", getUser);
