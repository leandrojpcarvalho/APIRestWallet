// import { Request } from 'express';
// import { TAllSchemas } from '../middlewares/Validation';

// export type ValidationType = [string ,(string | boolean)[][]][];

// const errorObjectMaker = (validateArray: ValidationType) => {
//   return validateArray.reduce((error, currValidation) => {
//     const [localKey, data] = currValidation;
//     const errorMsg = { ...data
//       .reduce((acc, [key, isValid]) => {
//         isValid
//           ? acc = {...acc, [key as string]: 'ok' }
//           : acc = {...acc, [key as string]: 'Is missing in the request' };
//         return acc;
//       }, {})};
//     if (data.length !== 0) error = { ...error, [localKey]: errorMsg };
//     return error;
//   }, {});
// };

// const reduceAllErrors = (schemas: TAllSchemas, req: Request) => {
//   return (Object.entries(schemas).reduce((error, [field, schema]) => {
//     const key = field as keyof typeof req;
//     const dataValid = schema(req[key]);
//     error.push([field, dataValid]);
//     return error;
//   }, [] as [string ,(string | boolean)[][]][]));
// };

// export const errorObject = (schemas: TAllSchemas, req: Request) => {
//   return errorObjectMaker(reduceAllErrors(schemas,req));
// };

// type QueryType = {
//   filter?: string;
//   limit?: number;
//   page?: number;
// }

type AllValidationType = {
  object: {
    query: QueryType;
  },
  setQuery: (object: QueryType) => void;
  moreThan: (more: number) => (string | boolean)[][];
  lengthValidation: (param: string | number, more: number) => boolean;
  errorMessageGenerator: (validateArray: ValidationType) => {}
}
export const AllValidations: AllValidationType = {
  object: {
    query: {} as QueryType,
  },
  setQuery: (object) => {
    AllValidations.object.query = object;
  },
  moreThan: (more) => {
    const allFields = Object.keys(AllValidations.object.query);
    return allFields.reduce((error, currField) => {
      const key = currField as keyof QueryType;
      const data = AllValidations.object.query[key];
      if (data) {
        error = [...error, [currField, AllValidations
          .lengthValidation(data, more)]];
      }
      return error;
    }, [] as (string | boolean)[][]);
  },
  lengthValidation: (param, more) => {
    const numberToComparison = Number(param);
    if(numberToComparison > more && numberToComparison > 0) {
      return true;
    }
    return String(param).length > more;
  },
  errorMessageGenerator: (validateArray: ValidationType) => {
    const [localKey, data] = validateArray;
    
    return {};
  }
};

AllValidations
