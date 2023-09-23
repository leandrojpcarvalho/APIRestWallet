import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';


export type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;

export type TAllSchemas = Record<TProperty, Schema<any>>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type ErrorObject = Record<TProperty, Record<string,string>>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next)=> {
  const schemas = getAllSchemas(schema => schema);
  
  let validationErrors:ErrorObject = {} as ErrorObject;

  Object.entries(schemas).forEach(([field, schema]) => {
    try {
      schema.validateSync(req[field as TProperty], {abortEarly:false});
    } catch (error) {
      const yupError = error as ValidationError;
      const newError = yupError.inner
        .reduce((errorsMessages, currError) => { 
          const { path, message } = currError;
          if(path) {
            errorsMessages = { ...errorsMessages, [path]: message};
          }
          return errorsMessages;
        }, {} as  Record<string,string>);
      validationErrors = { ...validationErrors, [field]: newError };
    }
  });
  if (Object.keys(validationErrors).length > 0) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ errors: validationErrors });
  }
  return next();
};

