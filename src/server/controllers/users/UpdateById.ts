import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Users } from '../../../types';

interface GetByIdProps {
  id?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<GetByIdProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<Users>(yup.object().shape({
    name: yup.string().required().min(3),
    expenses: yup.array().required(),
  })),
}));

export const updateById = async (req: Request<{}, {}, {}, GetByIdProps>, res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implementado');
};
