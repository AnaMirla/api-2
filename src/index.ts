import { Hono } from 'hono'
import {logger} from 'hono/logger'
import {prettyJSON} from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { userRoutes } from './users/userRoutes'
import { productRoutes } from './productos/productRoutes'

const app = new Hono()

//Middleware
app.use(cors())
app.use(prettyJSON())
app.use(logger())

//Routes
app.route('/usuarios', userRoutes)
app.route('/productos', productRoutes)

//Server
export default {
  port: 4000,
  fetch: app.fetch
}