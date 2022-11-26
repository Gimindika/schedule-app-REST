import { Router } from 'express';
import { deleteUser, login, register } from './auth.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router.route('/login').post(login);
router.route('/register').post(register);
router
	.route('/:user_id')
	.delete(authorize(['deleteUser', 'allAccess']), deleteUser);

export default router;
