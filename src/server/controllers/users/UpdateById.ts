import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Expense, Users } from '../../../types';
import { User } from './Create';

interface GetByIdProps {
  id?: number;
}
let db: User[] = [
  {
    id: 1,
    name: 'leandro',
    expenses: []
  },
  {
    id: 2,
    name: 'gabriela',
    expenses: [],
  }
];
export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<GetByIdProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<Users>(yup.object().shape({
    name: yup.string().required().min(3),
    expenses: yup.array().required(),
  })),
}));

export const updateById = async (req: Request<GetByIdProps, {}, User, {}>, res: Response) => {
  if (db.find((user) => user.id === Number(req.params.id))) {
    db = db.filter((user) => user.id !== Number(req.params.id));
    db.push(req.body);
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.BAD_REQUEST).json(`not exist element with id: ${req.params.id}`);
};
