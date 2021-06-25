import { Router } from 'express';
import { loginValidation } from '../middlewares/loginValidation';
import { userValidation } from '../middlewares/infValidation';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  login,
} from '../controllers/userController';

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.get('/users',loginValidation, getAllUsers);
usersRouter.get('/users/:id',loginValidation, getUserById);
usersRouter.post('/users', userValidation, loginValidation, createUser);
usersRouter.put('/users/:id',userValidation, loginValidation, updateUser);
usersRouter.delete('/users/:id',loginValidation, deleteUser);

export default usersRouter;