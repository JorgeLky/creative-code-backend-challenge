import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { conn } from '../database';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

const login = async(req: Request, res: Response) => {
  const { 
    userName,
    password,
  } = req.body;
  if(userName === process.env.APP_ADMIN && password == process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: process.env.APP_ADMIN }, process.env.SECRET, {
      expiresIn: '1d',
    });
    return res.status(200).json({message: 'usuário autorizado', token});
  } else {
    return res.status(404).json({ message: 'usuário não encontrado!' })
  }
}

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
  try{
    const {
      nome,
      telefone,
      email,
      idade,
      peso,
      etinia
  } = req.body;

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
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  };