import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { conn } from '../database';

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try{
    const result: QueryResult = await conn.query('SELECT * FROM usuarios');
    return res.status(200).json(result.rows);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try{
    const id = parseInt(req.params.id);
    const result: QueryResult = await conn.query('SELECT * FROM usuarios WHERE usuarioId = $1', [id]);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
}

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    nome,
    telefone,
    email,
    idade,
    peso,
    etinia
  } = req.body;

  try{
    await conn.query(
      'INSERT INTO usuarios (nome, telefone, email, idade, peso, etinia) VALUES ($1, $2, $3, $4, $5, $6)',
      [nome, telefone, email, parseInt(idade), parseInt(peso), etinia]
    );
    return res.status(200).json({
      message: 'usuario criado com sucesso!',
      user:
      {
        nome, telefone, email, idade, peso, etinia
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try{
    const {
      nome,
      telefone,
      email,
      idade,
      peso,
      etinia
  } = req.body;
  const id = parseInt(req.params.id);

  await conn.query(
    'UPDATE usuarios SET nome = $1, telefone = $2, email = $3, idade = $4, peso = $5, etinia = $6 WHERE usuarioId = $7',
    [nome, telefone, email, idade, peso, etinia, id]
  );

  return res.status(200).json({ message: `usuario ${ id } atualizado` });

  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try{
    const id = parseInt(req.params.id);
    await conn.query('DELETE FROM usuarios WHERE usuarioId = $1', [id]);
    return res.status(200).json({ message: `usuario ${ id } deletado com sucesso!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  };