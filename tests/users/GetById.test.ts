import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetById - users', () => {  

  it('verifica se a resposta da API é valida', async () => {
    const res1 = await testServer
      .get('/users/1')
      .send();
    expect(res1.status).toBe(StatusCodes.OK);
    expect(res1.body).toEqual({
      id: 1,
      name: 'leandro',
      expenses: []
    });
  });
  it('verifica se ao fazer um get com um id que nao existe exibe msg', async () => {
    const res1 = await testServer
      .get('/users/3')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(res1.body).toBe('not exist element with id: 3');
  });
});
