import request from 'supertest';
import { app } from '../server';
import dotenv from 'dotenv';
dotenv.config();

const token = async() => {
  const response = await request(app).post('/login').send({
    userName: process.env.APP_ADMIN,
    password: process.env.ADMIN_PASSWORD
  });
  return response.body.token;
}

describe('Testando a rota de usuários', () => {
  it('testando recebimento de token com usuário inválido', async() => {
    const response = await request(app).post('/login').send({
      userName: 'teste',
      password: 'teste'
    });
    expect(response.status).toBe(404);
  });
  it('testando recebimento de token com usuário válido', async() => {
    const response = await request(app).post('/login').send({
      userName: process.env.APP_ADMIN,
      password: process.env.ADMIN_PASSWORD
    });
    expect(response.status).toBe(200);
  });
  it('testando recebimento de lista de usuários', async() => {
    const response = await request(app).get('/users').set({
      authorization: await token()
    });
    expect(response.status).toBe(200);
  });
  it('testando cadastramento de usuários com campos inválidos', async() =>{
    const response = await request(app).post('/users').set({
      authorization: await token(),
    }).send({
      teste: 'teste'
    });
    expect(response.status).toBe(422);
  });
  it('testando cadastramneto de usuários com campos corretos', async() => {
    const response = await request(app).post('/users').set({
      authorization: await token(),
    }).send({
      nome: "roberto",
      telefone: 123456789,
      email: "adriano@gmail.com",
      idade: 43,
      peso: 73,
      etinia: "BRANCO"
    });
    expect(response.status).toBe(200);
  });
  it('testando cadastramento de usuário duplicado', async() => {
    const response = await request(app).post('/users').set({
      authorization: await token(),
    }).send({
      nome: "roberto",
      telefone: 123456789,
      email: "roberto@gmail.com",
      idade: 43,
      peso: 73,
      etinia: "BRANCO"
    });
    expect(response.status).toBe(422);
  })
});