import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('create - users', () => {
  it('verifica a criação de registros', async () => {
    const res1 = await testServer
      .post('/users')
      .send({
        name: 'usuario',
        expenses: []
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toBe('object');
    expect(typeof res1.body.id).toBe('number');

  });
  it('verifica se ao mandar dados incorretos retorna erro', async () => {
    const res1 = await testServer
      .post('/users')
      .send({
        name: 'usuario',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_GATEWAY);
    expect(typeof res1.body).toBe('object');
    expect(res1.body).toHaveProperty('errors');
    expect(res1.body.errors.body).toHaveProperty('expenses');
  });
});
