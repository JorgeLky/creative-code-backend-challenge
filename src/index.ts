import express from 'express';
import {
  addressRouter,
  usersRouter,
 } from './routes/index';

const app = express();
app.use(express.json());

app.use(usersRouter);
app.use(addressRouter);


app.listen(5000, () => {
  console.log('estamos online na porta 5000');
})