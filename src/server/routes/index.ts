import { Router } from 'express';
import { UsersControllers } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('API REST Wallet');
});
router.post(
  '/users',
  UsersControllers.createValidation,
  UsersControllers.create
);
router.put(
  '/users/:id',
  UsersControllers.updateByIdValidation,
  UsersControllers.updateById
);

router.get(
  '/users',
  UsersControllers.getAllValidation,
  UsersControllers.getAll
);
router.get(
  '/users/:id',
  UsersControllers.getByIdValidation,
  UsersControllers.getById
);
router.delete(
  '/users/:id',
  UsersControllers.deleteByIdValidation,
  UsersControllers.deleteById
);
export default router;
