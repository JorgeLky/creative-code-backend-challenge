import express from 'express';
import { userRouter } from './controler/index';

const app = express();
app.use(express.json());
app.use(userRouter);

app.listen(5000, () => {
  console.log('online!');
})