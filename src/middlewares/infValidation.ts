import { conn } from '../database';
import {
  Request,
  Response,
  NextFunction
} from 'express';
import { QueryResult } from 'pg';
const userValidation = async (req: Request, res: Response, next: NextFunction) => {
  const {
    nome,
    telefone,
    email,
    idade,
    peso,
    etinia
  } = req.body;
  if(
    !nome ||
    !telefone ||
    !email ||
    !idade ||
    !peso ||
    !etinia
    ) {
      return res.status(422).json({ message: 'verifique os dados' })
    }
  const validEmail = /\S+@\S+\.\S+/;
  const valid = (validEmail.test(email));
  if (!valid) {
    return res.status(422).json({ message: 'verifique o email e tente novamente' });
  };
  try{
    const verifyUsedEmail: QueryResult = await (conn.query('SELECT * FROM usuarios WHERE email = $1', [email]))
    if (verifyUsedEmail.rows.length !== 0) {
      return res.status(422).json({ message: 'email já cadastrado' });
    }
    next();
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'algo de errado aconteceu :(' });
  }
}

const addressValidation = (req: Request, res: Response, next: NextFunction) => {
  const {
    endereco,
    numero,
    cep,
    cidade,
    estado
  } = req.body;

  if(
    !endereco ||
    !numero ||
    !cep ||
    !cidade ||
    !estado
  ) {
    return res.status(422).json({
      message: 'endereço incompleto, verifique os dados e tente novamente!'
    });
  }
  next();
}

export {
  userValidation,
  addressValidation
}