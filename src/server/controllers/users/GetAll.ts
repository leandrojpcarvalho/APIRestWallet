import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface GetAllProps {
  page?: yup.Maybe<number|undefined>;
  limit?: yup.Maybe<number|undefined>; 
  filter?: yup.Maybe<string|undefined>;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<GetAllProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter:yup.string().notRequired(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, GetAllProps>, res: Response) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implementado');
};
