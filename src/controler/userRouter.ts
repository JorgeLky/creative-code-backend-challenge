import { Router } from 'express';
import { getUsers } from './usersControlers';

const userRouter = Router();

userRouter.use('/users', getUsers);

export default userRouter;