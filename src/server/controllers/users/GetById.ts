import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface GetByIdProps {
  id?: yup.Maybe<number|undefined>;
}
const db = [
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
];

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<GetByIdProps>(yup.object().shape({
    id: yup.number().notRequired().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<GetByIdProps>, res: Response) => {
  if (req.params.id) {
    const data = db.find((user) => user.id === Number(req.params.id));
    if (data){
      return res.status(StatusCodes.OK).json(data);
    }
    return res.status(StatusCodes.BAD_REQUEST).json(`not exist element with id: ${req.params.id}` );
  }
};
