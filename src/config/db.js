import {Pool, Pool} from 'pg'
import {dotenv} from 'dotenv'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

dotenv.config()

const Pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  module.exports = Pool

