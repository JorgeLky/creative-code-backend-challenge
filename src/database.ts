import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const conn = new Pool ({
  user: process.env.USERDB,
  host: process.env.HOST,
  password: process.env.PASSW,
  database: process.env.DATABASE,
  port: 5432
});

