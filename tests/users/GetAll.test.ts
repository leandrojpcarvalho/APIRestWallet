import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import ALL_USERS from '../mocks/allUsersData';

describe('GetAll - users', () => {  

  it('verifica se a resposta da API é valida', async () => {
    await Promise.all(ALL_USERS.users.map(async(user) => {
      const res1 = await testServer
        .post('/users')
        .send(user);
      expect(res1.body).toEqual({ id: 1});
    }));
  });
  it('verifica se ao fazer um get todos os dados são retornados', async () => {
    const res1 = await testServer
      .get('/users')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0);
    expect(res1.body.length).toBeGreaterThan(0);
  });
});
