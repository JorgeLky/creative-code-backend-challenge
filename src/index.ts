import express from 'express';
import {
  usersRouter,
 } from './routes/index';

const app = express();
app.use(express.json());

app.use(usersRouter);


app.listen(5000, () => {
  console.log('estamos online na porta 5000');
})