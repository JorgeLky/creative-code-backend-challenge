import { Request, Response } from 'express';
import { getAllUsers } from '../model/usersModel';

const getUsers = async(req: Request, res: Response) => {
  return res.status(200).json(await getAllUsers());
}

export { getUsers };