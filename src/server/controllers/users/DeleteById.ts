import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface GetByIdProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<GetByIdProps>(yup.object().shape({
    id: yup.number().notRequired().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<GetByIdProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: `id ${req.params.id} not found`,
    },
  });
  return res.status(StatusCodes.NO_CONTENT).send();
};
