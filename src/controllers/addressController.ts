import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { conn } from '../database';

const getAllAddress = async (req: Request, res: Response): Promise<Response> => {
  try{
    const response: QueryResult = await conn.query('SELECT * FROM enderecos');
    return res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado' });
  };
};

const getAddressById = async (req: Request, res: Response): Promise<Response> => {
  try{
    const id = parseInt(req.params.id);
    const response: QueryResult = await conn.query(
      'SELECT * FROM enderecos WHERE endId = $1',
      [id]);
    return res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'alguma coisa deu errado :(' });
  };
};

const createAddress = async (req: Request, res: Response): Promise<Response> => {
  try{
    const {
      endereco,
      numero,
      complemento,
      cep,
      cidade,
      estado
    } = req.body;
    await conn.query(
      'INSERT INTO enderecos (endereco, numero, complemento, cep, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6)',
      [endereco, parseInt(numero), complemento, parseInt(cep), cidade, estado]
    );
    return res.status(200).json({
      message: 'endereco criado com sucesso!',
      address:
      {
        endereco, numero, complemento, cep, cidade, estado
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'alguma coisa deu errado :(' });
  }
}

const updateAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const {
      endereco,
      numero,
      complemento,
      cep,
      cidade,
      estado
    } = req.body;
    await conn.query(
      'UPDATE enderecos SET endereco = $1, numero = $2, complemento = $3, cep = $4, cidade = $5, estado = $6 WHERE endId = $7',
      [endereco, parseInt(numero), complemento, parseInt(cep), cidade, estado, id]
    );
    return res.status(200).json({ message: `endereco ${ id } atualizado com sucesso!` });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado!'});
  }
}

const deleteAddress = async (req: Request, res: Response): Promise<Response> => {
  try{
    const id = parseInt(req.params.id)
    await conn.query('DELETE FROM enderecos WHERE endId = $1', [id]);
    return res.status(200).json({ message: `usuario ${ id } deletado com sucesso!` });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'algo deu errado :(' });
  }
}

export {
  getAllAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
}