import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Delete - users', () => {
  it('verifica a criação de registros', async () => {
    const data1 = await testServer
      .post('/users')
      .send({name: 'leandro', expenses: []});

    expect(data1.body).toEqual({ id: 1 });
    
    const res1 = await testServer
      .delete(`/users/${ data1.body.id }`)
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    // expect(typeof res1).toBe('object');
    // expect(typeof res1.params.id).toBe('number');

  });
  it('verifica se ao mandar dados incorretos retorna erro', async () => {
    const res1 = await testServer
      .delete('/users/0')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.BAD_GATEWAY);
    // expect(typeof res1.body).toBe('object');
    // expect(res1.body).toHaveProperty('errors');
    // expect(res1.body.errors.body).toHaveProperty('expenses');
    const res2 = await testServer
      .delete('/users/someUser')
      .send();
    expect(res2.statusCode).toEqual(StatusCodes.BAD_GATEWAY);
  });
  it('verifica se ao mandar um id que não exista retorna erro', async () => {
    const res1 = await testServer
      .delete('/users/99999')
      .send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});
