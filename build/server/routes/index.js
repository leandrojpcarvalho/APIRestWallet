"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// import { StatusCodes } from 'http-status-codes';
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    return res.send('olá dev');
});
router.post('/users', controllers_1.UsersControllers.createValidation, controllers_1.UsersControllers.create);
router.put('/users/:id', controllers_1.UsersControllers.updateByIdValidation, controllers_1.UsersControllers.updateById);
router.get('/users', controllers_1.UsersControllers.getAllValidation, controllers_1.UsersControllers.getAll);
router.get('/users/:id', controllers_1.UsersControllers.getByIdValidation, controllers_1.UsersControllers.getById);
router.delete('/users/:id', controllers_1.UsersControllers.deleteByIdValidation, controllers_1.UsersControllers.deleteById);
exports.default = router;
