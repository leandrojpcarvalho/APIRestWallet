import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { Users } from '../../../types';
import { StatusCodes } from 'http-status-codes';

export const createValidation = validation((getSchema) => ({
  body: getSchema<Users>(yup.object().shape(
    {
      name: yup.string().required().min(3),
      expenses: yup.array().required(),
    })),
}));

export const create = async (req: Request<{}, {}, Users>, res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implementado');
};
