import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface GetByIdProps {
  id?: yup.Maybe<number|undefined>;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<GetByIdProps>(yup.object().shape({
    id: yup.number().notRequired().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<{}, {}, {}, GetByIdProps>, res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implementado');
};
