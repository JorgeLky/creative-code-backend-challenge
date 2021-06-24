import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/userController';

const usersRouter = Router();

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', createUser);
usersRouter.put('/users/:id', updateUser);
usersRouter.delete('/users/:id', deleteUser);

export default usersRouter;