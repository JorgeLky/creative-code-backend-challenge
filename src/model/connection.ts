import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Pool({
  user: process.env.USERDB,
  password: process.env.PASSW,
  host: process.env.HOST,
  database: 'users-db',
  port: 5432,
})

export default connection;