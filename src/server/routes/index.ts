import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  return res.send('olá dev');
});
router.post('/post', (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});
router.delete('/delete', (req, res) => {
  return res.send('olá delete');
});
router.put('/put', (req, res) => {
  return res.send('olá put');
});

export default router;
