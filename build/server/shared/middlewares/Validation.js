"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validation = (getAllSchemas) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schemas = getAllSchemas(schema => schema);
    let validationErrors = {};
    Object.entries(schemas).forEach(([field, schema]) => {
        try {
            schema.validateSync(req[field], { abortEarly: false });
        }
        catch (error) {
            const yupError = error;
            const newError = yupError.inner
                .reduce((errorsMessages, currError) => {
                const { path, message } = currError;
                if (path) {
                    errorsMessages = Object.assign(Object.assign({}, errorsMessages), { [path]: message });
                }
                return errorsMessages;
            }, {});
            validationErrors = Object.assign(Object.assign({}, validationErrors), { [field]: newError });
        }
    });
    if (Object.keys(validationErrors).length > 0) {
        return res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({ errors: validationErrors });
    }
    return next();
});
exports.validation = validation;
