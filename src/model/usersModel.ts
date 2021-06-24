import conn from './connection';
import { QueryResult } from 'pg';

const getAllUsers = async() => {
  const response: QueryResult = await conn.query('SELECT * FROM usuarios');
  return response.rows;
}

export { getAllUsers };