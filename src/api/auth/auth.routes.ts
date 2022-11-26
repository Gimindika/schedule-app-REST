import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware';
import { deleteUser, login, register, updateUser } from './auth.controller';

const router = Router();
router.route('/login').post(login);
router.route('/register').post(register);
router
	.route('/:user_id')
	.patch(authorize(['updateUser', 'allAccess']), updateUser);
router
	.route('/:user_id')
	.delete(authorize(['deleteUser', 'allAccess']), deleteUser);

export default router;
