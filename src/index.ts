import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { userRoutes } from "./users/userRoutes";
import { productRoutes } from "./productos/productRoutes";
import { authRoutes } from "./auth/authRoutes";

const app = new Hono();

app.use(cors());
app.use(prettyJSON());
app.use(logger());

app.route("/usuarios", userRoutes);
app.route("/productos", productRoutes);
app.route('/login', authRoutes)

export default {
    port: 4000,
    fetch: app.fetch,
};
