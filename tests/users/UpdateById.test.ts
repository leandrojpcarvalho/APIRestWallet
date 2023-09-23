import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('UpdateById - users', () => {  

  it('verifica se a resposta da API é valida', async () => {
    const dataBefore = await testServer
      .get('/users/1')
      .send();
    const resUpdate = await testServer
      .put('/users/1')
      .send({
        id: 1,
        name: 'leandro Jose',
        expenses: []
      });
    const dataAfter = await testServer
      .get('/users/1')
      .send();
    expect(resUpdate.status).toBe(StatusCodes.OK);
    // expect(dataBefore.body).not.toEqual(dataAfter.body);
  });
  it('verifica se ao fazer um Update com um id que nao existe exibe msg', async () => {
    const res1 = await testServer
      .put('/users/3')
      .send({
        id: 3,
        name: 'leandro Jose',
        expenses: []
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toBe('not exist element with id: 3');
  });
  it('verifica se ao enviar requisição sem dados corretos apresenta erro', async () => {
    const res1 = await testServer
      .put('/users/1')
      .send();
    expect(res1.body).toEqual({
      errors: {
        body: {
          name: 'name is a required field',
          expenses: 'expenses is a required field'
        }
      }
    });
  });
});
