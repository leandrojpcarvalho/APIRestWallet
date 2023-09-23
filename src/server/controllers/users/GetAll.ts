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
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 2);
  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: 'leandro',
      expenses: []
    },
    {
      id: 2,
      name: 'gabriela',
      expenses: []
    }
  ]
  );
};
