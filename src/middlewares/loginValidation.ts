import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).json({ message: 'Token não encontrado!' });
  }

  try {

    await jwt.verify(authorization, process.env.SECRET as string);
    next();
  } catch (err){
    console.log(err);
    return res.status(401).json({ message: 'Token Inválido!' });
  }
}